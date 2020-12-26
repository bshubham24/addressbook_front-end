import configuration from "../configuration/configuration"; 
import AxiosService from "../services/axios-service.js";
export default class AddressBookService {
  baseUrl = configuration.baseUrl;
  tokenRequired = false;
  httpOptions = null;
  addPerson(data) {
    return AxiosService.postService(`${this.baseUrl}/create`, data);
  }
  getAllPersons() {
    return AxiosService.getService(`${this.baseUrl}/`);
  }
  getPerson(id) {
    return AxiosService.getService(`${this.baseUrl}/get/${id}`);
  }
  updatePerson(id,data) {
    return AxiosService.putService(`${this.baseUrl}/update/${id}`, data);
  }
  deletePerson(id) {
    return AxiosService.deleteService(`${this.baseUrl}/delete/${id}`);
  }
}  