$(() => {
    const clearAnswer = () => $("#question").text("");
    const noSuccess = () => {
        $("#question").val("Unable to reach server");
        setTimeout(clearAnswer, 5000);
    };

    $("#magic8ball").submit(e => {
        $.get(
            "/8ball", {}
        ).done(data => {
            $("#question").val(data);
        }).fail(noSuccess);
        e.preventDefault();
    });
});
