const logout = new LogoutButton();
logout.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
}
ApiConnector.current((response) => {
    console.log(response)
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})
const ratesTools = new RatesBoard();
function getRates() {
    ApiConnector.getStocks((response) => {
        console.log(response)
        if (response.success) {
            ratesTools.clearTable();
            ratesTools.fillTable(response.data);
        }
    })
}
getRates();
let ratesTiming = setInterval(getRates, 60000);