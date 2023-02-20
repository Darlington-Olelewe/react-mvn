import api from "./api";
import instance from "./Axios";
import { authHeader } from "./BaseService";


class EndPointService {
    async login(payload) {
        return instance.post(api.login, payload)
    }
    async createEmployee(payload) {
        return instance.post(api.employee, payload, { headers: authHeader() })
    }
    async fetchAllEmployee() {
        return instance.get(api.employee, {
            headers: authHeader()
        })
    }
    async fetchDashboard() {
        return instance.get(api.dashboard, { headers: authHeader() })
    }
    async changePassword(payload) {
        return instance.post(api.password, payload, { headers: authHeader() })
    }
    async createDepot(payload) {
        return instance.post(api.depot, payload, { headers: authHeader() })
    }
    async createStation(payload) {
        return instance.post(api.station, payload, { headers: authHeader() })
    }
    async fetchDepot() {
        return instance.get(api.depot, { headers: authHeader() })
    }
    async fetchStation() {
        return instance.get(api.station, { headers: authHeader() })
    }
    async createLicenseName(payload) {
        return instance.post(api.licensename, payload, { headers: authHeader() })
    }
    async fetchLicenseNames() {
        return instance.get(api.licensename, { headers: authHeader() })
    }
    async createStationLicence(payload) {
        return instance.post(api.stationlicense, payload, { headers: authHeader() })
    }
    async createDepotLicense(payload) {
        return instance.post(api.depotlicense, payload, { headers: authHeader() })
    }
    async createStationLicenceWithId(payload, id) {
        return instance.post(api.stationlicense + "/" + id, payload, { headers: authHeader() })
    }
    async fetchStationLicenses(id) {
        return instance.get(api.stationlicense + "/" + id, { headers: authHeader() })
    }
    async fetchDepotLicenses(id) {
        return instance.get(api.depotlicense + "/" + id, { headers: authHeader() })
    }
    async createDepotLicenseWithId(payload, id) {
        return instance.post(api.stationlicense + "/" + id, payload, { headers: authHeader() })
    }
    async attachDocument(formData, id) {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: authHeader().authorization,
            }
        }
        return instance.post(api.licensefile + "/" + id, formData, config)
    }
    async downloadDocument(id) {
        return instance.get(api.licensefile + "/" + id, { headers: authHeader(), responseType: "blob" })
    }

    async fetchChart(route, id){
        return instance.get(api.chart+"/"+route+"/"+id,{ headers: authHeader() })
    }

}
export default new EndPointService()