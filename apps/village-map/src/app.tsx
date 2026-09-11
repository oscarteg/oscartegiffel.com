import { Route, Router } from "@solidjs/router";
import { PublicMap } from "./routes/public-map";
import { VillageDeepLink } from "./routes/village-deep-link";

export function App() {
  return (
    <Router>
      <Route path="/" component={PublicMap} />
      <Route path="/v/:id" component={VillageDeepLink} />
    </Router>
  );
}
