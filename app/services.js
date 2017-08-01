/* USER SERVICE - login/logout/store/get User Data */
// TODO: use cookies/best practice for user persistency
anApp.service('userService', ['$window','$location',
function($window, $location){
  /* Check for localStorage and use it */
  let storageType = 'localStorage'; // sessionStorage
  let webStorage = null;
  function checkSupport() {
    try {
      if (storageType in $window && $window[storageType] !== null) {
        webStorage = $window[storageType];
        return true;
      } else {
        console.error('Could not use LocalStorage...');
        return false;
      }
    } catch(e) {
      console.error('Could not use LocalStorage: ', e);
      return false; // Failed while using Storage
    }
  };
  checkSupport();
  
  /* See if user is already logged-in/restore data if so */
  this.userData = JSON.parse(webStorage.getItem('flut.User-Data'));
  this.userState = (this.userData !== null) ? true : false;

  /* Set user data when user log-in */
  this.setUser = function(user){
    this.userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      dispName: user.dispName,
      tagline: user.tagline,
      profPicUrl: user.profPicUrl,
      joinDate: user.joinDate,
      following: user._following,
      followers: user._followers
    };
    webStorage.setItem('flut.User-Data', JSON.stringify(this.userData));
    this.userState = true;
    return true; // TODO: ret FALSE if user already set or something ?
  };

  /* Get user data (specific attr if provided) */
  // TODO: allow for multiple 'prop's
  this.getUser = function(prop){
    if (!this.userState) {
      console.error('UserService: User is not logged in');
      return null;
    }

    if (prop) {
      return this.userData[prop];
    } else {
      return this.userData;
    }
  };

  /* Check if LocalStorage is set */
  this.isLoggedIn = function(){
    this.userData = JSON.parse(webStorage.getItem('flut.User-Data'));
    this.userState = (this.userData !== null) ? true : false;
    return this.userState;
  };

  /* Log-out user and clear LocalStorage/etc. */
  this.logoutUser = function(){
    webStorage.removeItem('flut.User-Data');
    this.userData = null;
    this.userState = false;
    $location.path('/');
    return true; //TODO: ret FALSE if ...something ?
  };

}]);

