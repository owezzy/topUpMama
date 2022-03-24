import {AuthService} from "../services/auth.service";

export function appInitializer(authenticationService: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        // collect user data from localstorage if available
      authenticationService.refreshToken()
            .subscribe()
        // @ts-ignore
        .add(resolve);
    });
}
