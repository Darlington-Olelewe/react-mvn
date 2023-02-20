export default class User {
    constructor(
        id,
        depotId,
        depotName,
        email,
        firstName,
        lastName,
        role,
        stationId,
        stationName,
        token
    ) {
        this.id = id;
        this.depotId = depotId;
        this.depotName = depotName;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.stationId = stationId;
        this.stationName = stationName;
        this.token = token;
    }
}
