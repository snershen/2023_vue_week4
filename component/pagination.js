export default {
  props: ["pagination"],
  template: `<nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="pagination.has_pre"><a class="page-link" href="#" @click.prevent="$emit('getProduct',pagination.current_page-1)">上一頁</a></li>
        <li class="page-item" v-for="page in pagination.total_pages"><a class="page-link" :class={'active':pagination.current_page===page} href="#" @click.prevent="$emit('getProduct',page)">{{page}}</a></li>
        <li class="page-item" v-if="pagination.has_next"><a class="page-link" href="#" @click.prevent="$emit('getProduct',pagination.current_page+1)">下一頁</a></li>
      </ul>
    </nav>`,
};
