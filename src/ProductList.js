import { GetList } from "./api"
import { Component } from "./core/component"

export class ProductList extends Component{

    async setup(){
        this.$state = await GetList();
        this.render();
        this.setEvent();
        this.$el.hidden=false;
    }

    template(){
        return`
        <h1>상품목록</h1>
        <ul>${this.$state.map(item=>
            `<li class="Product" data-id=${item.id}>
            <img src=${item.imageUrl}>
            <div class="Product__info">
              <div>${item.name}</div>
              <div>${item.price} 원~</div>
            </div>
          </li>`
        )}
        `
    }
    setEvent(){
        this.addEvent("click",'.Product', (e)=>{
            const productId = e.target.dataset.id
            this.navigateTo('/web/products/${productId}', productId);
        })
    }
}