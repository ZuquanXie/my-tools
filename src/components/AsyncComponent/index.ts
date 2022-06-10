import { defineAsyncComponent } from "vue";
import { RouteComponent } from "vue-router";
import Loading from "./Loading.vue";
import ErrorComponent from "./ErrorComponent.vue";

export default (loader: () => Promise<RouteComponent>) => defineAsyncComponent({
    loader,
    loadingComponent: Loading,
    errorComponent: ErrorComponent,
});
