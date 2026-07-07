// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
buttonChangeStatus.forEach(button => {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    button.addEventListener("click", () => {
        const status = button.getAttribute("current-status");
        const id = button.getAttribute("data-id");
        let newStatus = status == "active" ? "inactive" : "active";

        const action = path + `/${newStatus}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();
    })
})
// End change status

// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]")
if (buttonsDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete-item")
    const path = formDelete.getAttribute("data-path")
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa?")
            if(isConfirm) {
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDelete.action = action
                formDelete.submit()
            }
        })
    })
}
// End delete item