/* eslint-disable prettier/prettier */
class AppUrl {
  static BaseUrl = "https://elamigodetodosandpueblo.com/";
  static eventList = this.BaseUrl + "wp-json/wp/v2/event_listing";
  static bogList = this.BaseUrl + "wp-json/wp/v2/posts";
  static getImageUrl = this.BaseUrl + "wp-json/wp/v2/media/";
  static gallaryPage = this.BaseUrl + "wp-json/wp/v2/pages/7821";
  static gallaryPageVideo =
    "https://api.elamigodetodosandpueblo.com/public/api/media-link";
  static postAppoinment =
    "https://api.elamigodetodosandpueblo.com/public/api/my-listing-request";
  static checkAppoinment =
    "https://api.elamigodetodosandpueblo.com/public/api/my-listing-request"; //45667

  static BaseUrl = "https://api.megabusinessusa.com/api";
  static MediaUrl = "https://www.megabusinessusa.com/wp-content/";

  // Bin Rentals, Dumpster / Roll-Offs Rental&limitPosts=10&page=2
  static ListByCatogory = this.BaseUrl + "/listing-by-category?category=";

  static Categories = this.BaseUrl + "/categories";

  static Booking = "https://api.megabusinessusa.com/public/api/booking";

  static Login = "https://api.elamigodetodosandpueblo.com/public/api/login";

  static Signup = "https://api.elamigodetodosandpueblo.com/public/api/register";

  static MyBooking = "https://api.megabusinessusa.com/public/api/my-booking";
  static UserDelete = this.BaseUrl + "/user-delete";
}

export default AppUrl;
