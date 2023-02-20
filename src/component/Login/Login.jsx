import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import EndPointService from "../Service/EndPointService";
import { setCurrentUser } from "../store/actions/user";
import User from "../Models/User";
import style from "./Login.module.css"

const Login=()=>{

  const [user, setUser] = useState(new User("", "", "", ""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();


    setLoading(true);

    EndPointService.login(user)
    
      .then((response) => {
        console.log(user)
        console.log(response.data)
        dispatch(setCurrentUser(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("username or password is not valid");
        setLoading(false);
      });
  };


    return (
        <div className={style.mainLoginForm}>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={(e) => handleLogin(e)}
            noValidate >
            <div className={style.formGroup}>
              <label>
                EMAIL ADDRESS
              </label>
              <input
                key={"email"}
                type="email"
                name="email"
                required
                placeholder="user@northwestpetroluem-ng.com"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.formGroup}>
              <label >
                PASSWORD
              </label>
              <input
                key={"password"}
                type="password"
                name="password"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.formGroup}>
              <button disabled={loading} className="btn btn-success">Login</button>
            </div>
    
            <div className={style.formGroup}>
              <p className={style.trademark}>
                © 2021 NorthWest_petroleum. All Rights Reserved.®
              </p>
            </div>
          </form>
        </div>
      );
}

export default Login;