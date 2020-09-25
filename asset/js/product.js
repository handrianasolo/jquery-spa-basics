(function(){
    let productsContent = "";
    
    $.get('data/product.json', function(products) {
        $.each(products, function(id, product) {
            productsContent += `
            <div class="col-12 col-md-6 col-lg-4" style="margin-top: 15px; margin-bottom: 15px;">
                <div class="card" data-product='${JSON.stringify(product)}'>
                    <img class="card-img-top" src="${product.image}" alt="Card image cap" style="width: 150px; height: 150px; margin: 0 auto;">
                    <div class="card-body">
                        <h4 class="card-title" style="height:80px; overflow: hidden;">${product.title}</h4>
                        <p class="card-text" style="height: 150px; overflow: hidden;">${product.description}</p>
                        <div class="row">
                            <div class="col">
                                <p class="btn btn-danger btn-block">${product.price} €</p>
                            </div>
                            <div class="col">
                                <a href="#" class="btn btn-success btn-block">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            $('.products .row').html(productsContent);
        });

        $('body').trigger('ADD_CART');
    });
})();

let totalPrice = 0;
let productAdded = [];
let totalPanier = 0;

$('body').on('ADD_CART', function(){
    // récuperer le nom et le prix du produit par le bouton
    $('p.btn.btn-danger.btn-block').click(function(e){
        e.preventDefault();
        let product = $('.card').attr('data-product');
        //console.log(product);

        let productJSON = JSON.parse(product);
        //console.log(productJSON);

        totalPrice+= productJSON.price;
        //console.log(totalPrice);

        //<span class="total">1 500.00 €</span>
        if($('span.total')[0].innerHTML !==  0){
            $('span.total')[0].innerHTML= totalPrice + '€';
        }else{
            $('span.total')[0].innerHTML= 0;
        }

        productAdded.push(productJSON);

        let ul = $('<ul class="list-group mb-3"></u>');

        for(let i=0; i<productAdded.length; i++){
            let li = $(`<li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">${productAdded[i].title}</h6>
                            </div>
                            <span class="text-muted">${productAdded[i].price} €</span>
                        </li>`);
            ul.append(li);
        }

        // J'AI PAS TROP REUSSI A AFFICHER LE PANIER :)
    });
});