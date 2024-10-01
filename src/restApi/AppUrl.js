/* eslint-disable prettier/prettier */
class AppUrl {
  static BaseUrl = 'https://elamigodetodosandpueblo.com/';
  static eventList = this.BaseUrl + 'wp-json/wp/v2/event_listing';
  static bogList = this.BaseUrl + 'wp-json/wp/v2/posts';
  static getImageUrl = this.BaseUrl + 'wp-json/wp/v2/media/';
  static gallaryPage = this.BaseUrl + 'wp-json/wp/v2/pages/7821';
  static gallaryPageVideo = this.BaseUrl + 'wp-json/wp/v2/pages/7883';
  static postAppoinment = 'https://dr-marvin-api-md1k.vercel.app/appointment';
  static checkAppoinment =
    'https://dr-marvin-api-md1k.vercel.app/appointments/'; //45667
}

export default AppUrl;
