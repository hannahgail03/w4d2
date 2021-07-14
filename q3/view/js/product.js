$(() => {
    const clearMsg = () => $('#msg').text('');
    const updateCartNo = () => {
        $.get('/productsNo').done(data => {
            $('#cartNo').text(data);
        });
    };
    updateCartNo();

    $('#add-product').submit(e => {
        const data = {
            id: $('#id').val(),
            name: $('#name').val(),
            price: $('#price').val(),
            qty: $('#qty').val()
        };

        $.post({
            url: "/addToCart",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        }).done(() => {
            $("#msg").text("Product added successfully");
            setTimeout(clearMsg, 3000);
            updateCartNo();
        });

        e.preventDefault();
    });

});