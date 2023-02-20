const base = "http://51.77.99.34:8080/grms-api"

const api = {
    login: `${base}/login`,
    basic: base,
    employee: `${base}/employee`,
    dashboard: `${base}/employee/dashboard`,
    password: `${base}/employee/password`,
    depot: `${base}/setup/depot`,
    station: `${base}/setup/station`,
    licensename: `${base}/licenses/names`,
    depotlicense: `${base}/licenses/depot`,
    stationlicense: `${base}/licenses/station`,
    licensefile: `${base}/licenses/file`,
    chart: `${base}/charts`
}

export default api;