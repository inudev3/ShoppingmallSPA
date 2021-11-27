import {ProductList} from "../ProductList";
import {ProductDetail} from "../ProductDetail";
import {Cart} from "../Cart";

export class Component{
    $el; $props; $state;

    constructor(el, props){

        this.$el=el;
        this.$props= props;
        this.setup();
    }

    async setup(){
        this.render()
        this.setEvent()
        this.$el.hidden=false;

    }
    render(){
        this.$el.innerHTML = this.template();
    }
    setState(newState){
        this.$state= {...this.$state, ...newState};
    }
    mount(){}
    template(){
        return ``;
    }
    setEvent(){

    }
    addEvent( eventType, selector, callback, ) {
        const children = [...this.$el.querySelectorAll(selector)];
        const isTarget = (target) =>
            target.closest(selector) || children.includes(target);
        this.$el.addEventListener(eventType, (e) => {
                if (!isTarget(e.target)) {
                    return false;
                }
                callback(e);
            }
        );
    }
    async router (id=""){

        const routes = [
            { path: "/web", view: () => new ProductList(document.querySelector(".ProductListPage"))},
            { path: `/web/products/${id}`,  view:()=> new ProductDetail(document.querySelector(".ProductDetailPage"), {}) },
            { path: "/web/cart", view: () => new Cart(document.querySelector(".CartPage")) },
        ];

        const potentialMatches = routes.map((route) => {
            return {
                route,
                isMatch: location.pathname === route.path,
            };
        });
        let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
        if (!match) {
            match = {
                route: routes[0],
                isMatch: true,
            };
        }
        match.route.view();
    }
    navigateTo(url, id="" ){
        history.pushState({...state}, null, url);
        this.router(id);
        this.$el.hidden=true;
    };

}