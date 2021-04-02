import Entry from "../../config/entry";
import routes from "./router";
import modules from "../../store";
new Entry(routes, modules).init();