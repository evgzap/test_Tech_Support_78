interface IUserData {
  [key: string]: string | number;
}

class Api {
  constructor() {}
  /**
   * Заполняет строковый шаблон template данными из объекта object
   *
   * @author		User Name
   * @version		v.1.0 (dd/mm/yyyy)
   * @param		{object} object
   * @param		{string} template
   * @return		{string}
   */
  public get_api_path(object: IUserData, template: string): string {
    let result = template;
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        const regExp = new RegExp(`%${key}%`, "g");
        result = this.replace_placeholder(result, object[key], regExp);
      }
    }
    return result;
  }
  /**
   * Заменяет плейсхолдер в строке template значением value
   *
   * @param		{string} template
   * @param		{string} key
   * @param		{string} value
   * @param		{string} regExp
   * @return		{string}
   */
  private replace_placeholder(template: string, value:IUserData[keyof IUserData], regExp:RegExp): string {
    let encodedValue = encodeURIComponent(value);
    return template.replace(regExp, encodedValue);
  }
}

const api = new Api();
const user: IUserData = {
  id: 20,
  name: "John Dow",
  role: "QA",
  salary: 100,
};

const api_path_templates: string[] = [
  "/api/items/%id%/%name%",
  "/api/items/%id%/%role%",
  "/api/items/%id%/%salary%",
];
const api_paths: string[] = api_path_templates.map((api_path_template) => {
  return api.get_api_path(user, api_path_template);
});

console.log(JSON.stringify(api_paths));