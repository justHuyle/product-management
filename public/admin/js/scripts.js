// Button status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End button status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value.trim();
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

// Pagination
const btnPaginations = document.querySelectorAll("button[button-pagination]");
btnPaginations.forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.getAttribute("button-pagination");
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    window.location.href = url.toString();
  });
});
// End pagination

// Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("change", () => {
    inputIds.forEach((input) => {
      input.checked = inputCheckAll.checked;
    });
  });

  inputIds.forEach((input) => {
    input.addEventListener("change", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        'input[name="id"]:checked',
      ).length;
      if (countChecked === inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputChecked = document.querySelectorAll("input[name='id']:checked");
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete") {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa?");
      if (!confirmDelete) return;
    }
    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(",");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 sản phẩm!");
    }
  });
}
// End form change multi

// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  if (closeAlert) {
    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
}
// End show alert

// upload image
const uploadImage = document.querySelector("[upload-image]");
const clearImage = uploadImage.querySelector("[clear-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            clearImage.classList.remove("d-none");
        }
    });
    clearImage.addEventListener("click", () => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
        clearImage.classList.add("d-none");
    });
}
// End upload image