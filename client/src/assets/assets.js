import accentureLogoImg from "./accenture_logo.svg";
import addIconImg from "./add_icon.svg";
import adobeLogoImg from "./adobe_logo.svg";
import appointmentsIconImg from "./appointments_icon.svg";
import arrowIconImg from "./arrow_icon.svg";
import blueTickIconImg from "./blue_tick_icon.svg";
import course1Img from "./course_1.png";
import course2Img from "./course_2.png";
import course3Img from "./course_3.png";
import course4Img from "./course_4.png";
import crossIconImg from "./cross_icon.svg";
import downArrowIconImg from "./down_arrow_icon.svg";
import dropdownIconImg from "./dropdown_icon.svg";
import earningIconImg from "./earning_icon.svg";
import facebookIconImg from "./facebook_icon.svg";
import fileUploadIconImg from "./file_upload_icon.svg";
import homeIconImg from "./home_icon.svg";
import instagramIconImg from "./instagram_icon.svg";
import lessonIconImg from "./lesson_icon.svg";
import logoImg from "./logo.svg";
import logoDarkImg from "./logo_dark.svg";
import microsoftLogoImg from "./microsoft_logo.svg";
import myCourseIconImg from "./my_course_icon.svg";
import patientsIconImg from "./patients_icon.svg";
import paypalLogoImg from "./paypal_logo.svg";
import personTickIconImg from "./person_tick_icon.svg";
import playIconImg from "./play_icon.svg";
import profileImgImg from "./profile_img.png";
import profileImg2Img from "./profile_img2.png";
import profileImg3Img from "./profile_img3.png";
import profileImg1Img from "./profile_img_1.png";
import profileImg4Img from "./profile_img_2.png";
import profileImg5Img from "./profile_img_3.png";
import ratingStarImg from "./rating_star.svg";
import reactImg from "./react.svg";
import searchIconImg from "./search_icon.svg";
import sktechImg from "./sktech.svg";
import starDullIconImg from "./star_dull_icon.svg";
import timeClockIconImg from "./time_clock_icon.svg";
import timeLeftClockIconImg from "./time_left_clock_icon.svg";
import twitterIconImg from "./twitter_icon.svg";
import uploadAreaImg from "./upload_area.svg";
import userIconImg from "./user_icon.svg";
import userIcon2Img from "./user_icon_2.svg";
import walmartLogoImg from "./walmart_logo.svg";

const assets = {
  accentureLogo: accentureLogoImg,
  adobeLogo: adobeLogoImg,
  microsoftLogo: microsoftLogoImg,
  paypalLogo: paypalLogoImg,
  walmartLogo: walmartLogoImg,
  addIcon: addIconImg,
  appointmentsIcon: appointmentsIconImg,
  arrowIcon: arrowIconImg,
  blueTickIcon: blueTickIconImg,
  course1: course1Img,
  course2: course2Img,
  course3: course3Img,
  course4: course4Img,
  crossIcon: crossIconImg,
  downArrowIcon: downArrowIconImg,
  dropdownIcon: dropdownIconImg,
  earningIcon: earningIconImg,
  facebookIcon: facebookIconImg,
  fileUploadIcon: fileUploadIconImg,
  homeIcon: homeIconImg,
  instagramIcon: instagramIconImg,
  lessonIcon: lessonIconImg,
  logo: logoImg,
  logoDark: logoDarkImg,
  myCourseIcon: myCourseIconImg,
  patientsIcon: patientsIconImg,
  paypalLogo: paypalLogoImg,
  personTickIcon: personTickIconImg,
  playIcon: playIconImg,
  profileImg: profileImgImg,
  profileImg1: profileImg1Img,
  profileImg2: profileImg2Img,
  profileImg3: profileImg3Img,
  profileImg4: profileImg4Img,
  profileImg5: profileImg5Img,
  ratingStar: ratingStarImg,
  react: reactImg,
  searchIcon: searchIconImg,
  sktech: sktechImg,
  starDullIcon: starDullIconImg,
  timeClockIcon: timeClockIconImg,
  timeLeftClockIcon: timeLeftClockIconImg,
  twitterIcon: twitterIconImg,
  uploadArea: uploadAreaImg,
  userIcon: userIconImg,
  userIcon2: userIcon2Img,
};

export const courses = [
  {
    _id: 4,
    image: course1Img,
    title: "Cloud Computing Essentials",
    instructor: "GreatStack",
    rating: 3,
    reviews: 5,
    price: 55.99,
    discount: 10,
  },
  {
    _id: 3,
    image: course2Img,
    title: "AI Chatbot Development",
    instructor: "CodeCraft",
    rating: 4,
    reviews: 12,
    price: 69.99,
    discount: 40,
  },
  {
    _id: 2,
    image: course3Img,
    title: "MERN Stack Mastery",
    instructor: "DevTrail",
    rating: 5,
    reviews: 48,
    price: 89.0,
    discount: 30,
  },
  {
    _id: 1,
    image: course4Img,
    title: "Designing with React & Tailwind",
    instructor: "UI Fusion",
    rating: 4,
    reviews: 22,
    price: 49.99,
    discount: 20,
  },
];

export const dummyTestimonial = [
  {
    name: "Donald Jackman",
    role: "SME 1 @ Amazon",
    image: assets.profileImg1,
    rating: 5,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "Sarah Chen",
    role: "Digital Marketer @ Google",
    image: assets.profileImg2,
    rating: 4,
    feedback:
      "Imagify has transformed our social media workflow. The batch processing feature saves us hours every week!",
  },
  {
    name: "Michael Rodriguez",
    role: "Content Creator",
    image: assets.profileImg3,
    rating: 5,
    feedback:
      "As a solo creator, I need tools that just work. Imagify delivers consistently with no learning curve.",
  },
  {
    name: "Emily Wilson",
    role: "UX Designer @ Meta",
    image: assets.profileImg4,
    rating: 4,
    feedback:
      "The AI enhancements in Imagify produce professional results that impress both my team and clients.",
  },
  {
    name: "James Park",
    role: "Photography Director",
    image: assets.profileImg5,
    rating: 5,
    feedback:
      "We switched our entire studio to Imagify and saw a 30% increase in productivity within the first month.",
  },
];

export default assets;
