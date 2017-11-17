import Auth0Lock from 'auth0-lock'

let options = {
    auth: {
        redirect: false,
        params: {
          scope: 'openid profile email',
        },
    },
    language:'en',
    primaryColor:'#31324F',
    languageDictionary: {
        title: "LOGIN"
      },
}

let lock = new Auth0Lock(
    "CLIENT_ID",
    "DOMAIN",
    options);

export default class AuthenticationService {
    login() {
        return new Promise((resolve, reject) => {
            lock.show();
            lock.on("authenticated", (authResult) => {
                localStorage.setItem("accessToken", authResult.accessToken);
                lock.getUserInfo(authResult.accessToken, (error, profile) => {
                    if (error) {
                        // Handle error
                        return reject(error);
                    }

                    localStorage.setItem("profile", JSON.stringify(profile));
                    lock.hide();
                    return resolve(profile);
                });
            });
        });
    }

    logout() {
        localStorage.clear();
    }
}
