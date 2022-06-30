const RATES_UPDATE_TIME = 60000;

const logout = new LogoutButton();
logout.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
}
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})
const ratesTools = new RatesBoard();
function getRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesTools.clearTable();
            ratesTools.fillTable(response.data);
        }
    })
}
getRates();
let ratesTiming = setInterval(getRates, RATES_UPDATE_TIME);

const money = new MoneyManager();

money.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Успешно!')
        }
        else {
            money.setMessage(false, 'Ошибка!');
        }
    })
}
money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Успешно!')
        }
        else {
            money.setMessage(false, 'Ошибка!');
        }
    })
}
money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Успешно!')
        }
        else {
            money.setMessage(false, 'Ошибка!');
        }
    })
}

const favorites = new FavoritesWidget();

function renderUsers(data) {
    favorites.clearTable();
    favorites.fillTable(data); 
    money.updateUsersList(data);     // DRY
}

ApiConnector.getFavorites((responce) => {
    if (responce.success) {
        renderUsers(responce.data)
    }
})
favorites.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (responce) => {
        if (responce.success) {
            renderUsers(responce.data);
        }
    })
}
favorites.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (responce) => {
        if (responce.success) {
            renderUsers(responce.data);
        }
    })
}