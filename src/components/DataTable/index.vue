<template>
  <div>
    <el-card class="box-card" shadow="never">
      <!-- div top height -->
      <div ref="tableHeight"></div>
      <!-- 表格 :element-loading-text="options.loadingText"-->
      <el-table
        ref="multipleTable"
        :data="dataList"
        v-loading="options.loading"
        :size="options.size"
        :height="options.FiexdHeight ? tableHeight : null"
        @selection-change="handleSelectionChange"
        :border="options.border"
        :stripe="options.stripe"
        :row-class-name="options.rowClassName"
      >
        <!--选择框-->
        <el-table-column
          v-if="options.mutiSelect"
          type="selection"
          :selectable="options.isDisabled"
          width="46"
          align="center"
        ></el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-if="options.indexNum"
          type="index"
          :label="$t('publics.numberIndex')"
          align="center"
          :width="options.indexNumWidth"
          :min-width="options.minWidth"
          :index="indexMethod"
        ></el-table-column>
        <!--数据列-->
        <template v-for="(column, index) in columns">
          <el-table-column
            :type="column.expand"
            :prop="column.prop"
            :label="column.label"
            :align="column.align"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :sortable="column.sortable"
            :show-overflow-tooltip="column.tooltip || false"
            v-if="!column.hide"
          >
            <template slot-scope="scope">
              <template v-if="!column.render">
                <template v-if="column.formatter">
                  <span v-html="column.formatter(scope.row, column)"></span>
                </template>
                <template v-else>
                  <span>{{scope.row[column.prop]}}</span>
                </template>
              </template>
              <template v-else>
                <expand-dom
                  :column="column"
                  :row="scope.row"
                  :render="column.render"
                  :index="index"
                ></expand-dom>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-card>
    <el-card class="box-card" shadow="never">
      <el-pagination
        v-if="pagination.show"
        style="text-align:right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :prev-text="$t('publics.pagination.prevText')"
        :next-text="$t('publics.pagination.nextText')"
        layout="total, sizes, prev, pager, next, jumper"
        :hide-on-single-page="false"
        :total="pagination.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      //配置选项
      type: Object,
      default: () => {
        return {
          loading: false, //表格loding
          loadingText: "拼命加载中", //loding文字
          size: "small", //表格大小
          border: true, //表格边框
          stripe: false, //表格斑马
          mutiSelect: false, //选择框
          indexNum: false, //序号
          FiexdHeight: false, //是否固定表格高度
          isDisabled: () => 1, //返回 0是禁用，1是可选择
          indexNumWidth: 60,
          rowClassName: () => {},
        };
      },
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [], // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    },
    pagination: {
      type: Object,
      deefault: () => {}, // 分页参数 === pageSize:每页展示的条数，currentPage:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
    },
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  data() {
    return {
      tableHeight: 500,
      pageNo: 1,
      pageSize: 10,
      data: [],
      loading: false,
      multipleSelection: [],
      total: null,
      tableCurrentPagination: {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
      },
    };
  },
  computed: {},
  created() {

  },
  mounted() {
    this.getClienHeight();
  },
  methods: {
    // 计算表格高度
    getClienHeight() {
      var winHeight = 0;
      var tableHeight = 500;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      //通过深入Document内部对body进行检测，获取浏览器窗口高度
      if (document.documentElement && document.documentElement.clientHeight) {
        winHeight = document.documentElement.clientHeight;
      }
      this.$nextTick(() => {
        let soll = this.$refs.tableHeight.getBoundingClientRect().top;
        tableHeight = winHeight - soll - 114;
        this.tableHeight = tableHeight;
      });

      return tableHeight;
    },
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
    },
    /*------------------------------------分页-------------------------------------*/
    // 切换每页显示的数量 10, 20, 50, 100
    handleSizeChange(size) {
      if (this.pagination) {
        this.tableCurrentPagination.pageSize = size;
        this.tableCurrentPagination.currentPage = this.pagination.currentPage;
        this.$emit("handleSizeChange", this.tableCurrentPagination);
      }
    },
    // 切换页码
    handleCurrentChange(currnet) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = currnet;
        this.$emit("handleCurrentChange", this.tableCurrentPagination);
      }
    },
    indexMethod(index) {
      let num =
        this.pagination.pageSize * (this.pagination.currentPage - 1) +
        (index + 1);
      return num;
    },
    //多选过滤（是否禁用）
    isDisabled(val) {
      return this.options.isDisabled(val);
    },
    scrollTop(){
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
      })
    },
  },
  watch:{
    pagination:{
      handler(val) {
        if(val.pageSize >= 20){
          this.options.FiexdHeight = true
        }
        this.scrollTop()
  　　},
  　　deep: true
    },
  }
};
</script>

<style lang="scss">
.select {
  margin: 0 4px;
}
.el-table--small {
  font-size: 13px;
}
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
  padding: 0 10px;
}
.el-image-viewer__wrapper .el-icon-circle-close {
  color: #fff;
}
</style>
