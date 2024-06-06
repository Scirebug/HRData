import { Auth as AmplifyAuth } from "aws-amplify";

export default class Auth {
  tempCurrentUser;

  checkAuth = async () => {
    try {
      const user = await AmplifyAuth.currentUserCredentials();
      return !!user.authenticated;
    } catch (error) {
      console.error("Error checking auth", error);
      return false;
    }
  };

  getToken = async () => {
    return (await AmplifyAuth.currentSession()).getIdToken().getJwtToken();
  };

  async login(username, password) {
    try {
      const result = await AmplifyAuth.signIn(username, password);
      this.tempCurrentUser = result;
      const status =
        result.challengeName === "NEW_PASSWORD_REQUIRED"
          ? "new-password-required"
          : "success";
      return { status, errorMessage: undefined };
    } catch (error) {
      console.error("signin error", error);
      return {
        status: undefined,
        errorMessage:
          error instanceof Error ? error.message : "Unknown error logging in",
      };
    }
  }

  async completePassword(newPass) {
    try {
      const currUser = this.tempCurrentUser; // await AmplifyAuth.currentAuthenticatedUser();
      await AmplifyAuth.completeNewPassword(currUser, newPass, {});
      return { success: true, errorMessage: undefined };
    } catch (error) {
      console.error("Complete password error", error);
      return {
        success: false,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Server Error, try again later",
      };
    }
  }

  async resetPassword(username) {
    try {
      await AmplifyAuth.forgotPassword(username);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Server Error, try again later",
      };
    }
  }

  async completeReset(username, code, newPass) {
    try {
      await AmplifyAuth.forgotPasswordSubmit(username, code, newPass);
      return { success: true, errorMessage: undefined };
    } catch (error) {
      console.error("Complete reset password error", error);
      return {
        success: false,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Server Error, try again later",
      };
    }
  }

  logout() {
    AmplifyAuth.signOut();
    window.location.href = window.location.origin;
  }
}
