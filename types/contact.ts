export interface ContactType {
  name: string,
  phone_number: string,
  email: string,
  preferred_contact: string,
  address: string,
  message: string,

  // THESE ARE FIELDS just for detecting spam and bots
  // They will be carried along but not used
  age: string;
  height: string;
  shoeSize: string;

}