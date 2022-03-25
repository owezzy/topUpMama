import {AuthService} from "../services/auth.service";
import {User} from "../users/model/user";

export function appInitializer(authenticationService: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        // collect user data from localstorage if available
      // @ts-ignore
      const localData:User = JSON.parse(localStorage.getItem('authState'))
      if (localData === null){
      } else {
      authenticationService.refreshToken(localData.id)
            .subscribe()
        // @ts-ignore
        .add(resolve);
    }
    })
}
