class Api {
  constructor() {}
  get_api_path(object, template) {
    let result = "";

    let parts = template.split("/");
    for (let part of parts) {
      if (part.startsWith("%") && part.endsWith("%")) {
        let key = part.slice(1, -1);
        if (object.hasOwnProperty(key)) {
          result += "/" + encodeURIComponent(object[key]);
        } else {
          result += "/" + part;
        }
      } else {
        result += "/" + part;
      }
    }
    if (result.startsWith("//")) {
      result = result.slice(1);
    }
    return result;
  }
}

let api = new Api();
let user = {
  id: 20,
  name: "John Dow",
  role: "QA",
  salary: 100,
};

let api_path_templates = [
  "/api/items/%id%/%name%",
  "/api/items/%id%/%role%",
  "/api/items/%id%/%salary%",
];
let api_paths = api_path_templates.map((api_path_template) => {
  return api.get_api_path(user, api_path_template);
});

console.log(JSON.stringify(api_paths));
