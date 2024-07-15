interface IUserData {
  [key: string]: string | number;
}

class Api {
  constructor() {}
  public get_api_path(object: IUserData, template: string): string {
    let result = template;
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        let regExp = new RegExp(`%${key}%`, "g");
        let value = encodeURIComponent(object[key]);
        result = result.replace(regExp, value);
      }
    }
    return result;
  }
}

const api = new Api();
const user: IUserData = {
  id: 20,
  name: "John Dow",
  role: "QA",
  salary: 100,
};

const api_path_templates = [
  "/api/items/%id%/%name%",
  "/api/items/%id%/%role%",
  "/api/items/%id%/%salary%",
];
const api_paths: string[] = api_path_templates.map((api_path_template) => {
  return api.get_api_path(user, api_path_template);
});

console.log(JSON.stringify(api_paths));
