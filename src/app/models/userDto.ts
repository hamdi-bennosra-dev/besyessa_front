//import { UserDetails } from "./userdetails";

export interface UserDto {
    id: string;
    username: string;
    email: string;
    userDetails?: UserDetails;
  }

  export interface UserDetails {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
    aboutMe: string;
    profilePicture: string;
  }

    /*export interface UserDetails {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      country: string;
      city: string;
      address: string;
      postalCode: string;
      aboutMe: string;
      profilePicture: string;
    }
    
    export interface UserDto {
      id: string;
      email: string;
      username: string;
      userDetails: UserDetails;
    }*/
    