import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

import Pagination from "./component/pagination.js";
import ProductModal from "./component/productModal.js";
import DeleteModal from "./component/deleteModal.js";

const api_baseUrl = "https://vue3-course-api.hexschool.io/";
const api_path = "escaperoom";
const token = document.cookie.replace(/(?:(?:^|.*;\s*)escaperoom\s*=\s*([^;]*).*$)|^.*$/, "$1");

const app = {
  data() {
    return {
      productList: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
    };
  },
  components: { Pagination, ProductModal, DeleteModal },
  methods: {
    openModal(isNew, item) {
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
      this.isNew = isNew;
      if (this.isNew) {
        this.tempProduct = {};

        return;
      }
      if (!this.isNew) {
        this.tempProduct = { ...item };
      }
    },
    updateProduct() {
      let url = `${api_baseUrl}v2/api/${api_path}/admin/product`;
      if (this.isNew) {
        axios.post(url, { data: this.tempProduct }).then((res) => {
          this.getProducts();
          alert("產品新增成功");
        });
        const productComponent = this.$refs.productModal;
        productComponent.hideModal();
        return;
      }
      url = `${api_baseUrl}v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
      axios.put(url, { data: this.tempProduct }).then((res) => {
        this.getProducts();
        alert("產品更新成功");
      });
      const productComponent = this.$refs.productModal;
      productComponent.hideModal();
    },
    deleteProduct(product) {
      this.tempProduct = product;
      const deleteModalComponent = this.$refs.delProductModal;
      deleteModalComponent.showModal();
    },
    confirmDelete() {
      const url = `${api_baseUrl}v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
      axios.delete(url).then((res) => {
        this.getProducts();
        const deleteModalComponent = this.$refs.delProductModal;
        deleteModalComponent.hideModal();
      });
    },
    getProducts(page = 1) {
      const url = `${api_baseUrl}v2/api/${api_path}/admin/products/?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          this.productList = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkLogin() {
      const url = "https://vue3-course-api.hexschool.io/v2/api/user/check";
      axios
        .post(url)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert("驗證失敗");
          window.location = "login.html";
        });
    },
    createImages() {
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push("");
        return;
      }
      this.tempProduct.imagesUrl.push("");
    },
  },
  created() {
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
  mounted() {
    this.getProducts();
  },
};

createApp(app).mount("#app");
