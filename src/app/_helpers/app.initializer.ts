import {AuthService} from "../services/auth.service";
import {User} from "../users/model/user";

export function appInitializer(authenticationService: AuthService): Promise<any> {
    return new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        // collect user data from localstorage if available
      // @ts-ignore
      authenticationService.refreshToken()
            .subscribe()
        // @ts-ignore
        .add(resolve);
    })
}
