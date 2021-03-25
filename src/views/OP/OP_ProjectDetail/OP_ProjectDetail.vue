<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body" style="font-family: Poppins !important;">
      <div class="">
        <div class="card" style="font-size: 12px !important;">
          <div class="card__body">
            <b-row>
              <b-col md="2" lg="2" style="color: #4A93B3; font-size: 16px;">
                Project Detail
              </b-col>
              <b-col style="text-align: right;">
                <ABSButton
                  v-if="!paramFromList.isDashboardDev"
                  :text="'Description'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="showDescription"
                />
                <ABSButton
                  v-if="!paramFromList.isDashboardDev"
                  :text="'Event'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="showEvent"
                />
                <ABSButton
                  v-if="!paramFromList.isDashboardDev"
                  :text="'Principle'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="showPrinciple"
                />
                <ABSButton
                  v-if="!paramFromList.isDashboardDev"
                  :text="'Progress'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="showProgress"
                />
                <ABSButton
                  v-if="!paramFromList.isDashboardDev"
                  :text="'Promotion'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="showPromotion"
                />
                <ABSButton
                  v-if="!paramFromList.isDashboardDev"
                  :text="'News'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="showNewsFeed"
                />
                <ABSButton
                  :text="'Back'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="$router.go(-1)"
                />
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card__body">

          <b-row style="margin-top: 10px;">
            <b-col lg="2" align-self="center">
              <div style="
                height: 160px;
                background: #FFFFFF;
                border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;">
                  <b-img :src="urlHoonian + projectInfos.info.icon_project" alt=""
                    @error="onImageLoadFailure($event)"
                    style="height: 80px;
                    width: 80px;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);" />
              </div>
            </b-col>
            <b-col lg="10" align-self="center">
              <div style="height: 160px;
                border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;
                font-size: 11px;
                letter-spacing: 0.5px;">
                
                <b-row>
                  <b-col lg="7">
                    <div style="padding-top: 5px; padding-bottom: 5px;">
                      <b-row>
                        <b-col style="font-size: 18px;">
                          <b>{{projectInfos.info.company_group_name}}</b>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Project Code</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="padding-left: 10px !important;" class="text">
                          <b>{{projectInfos.info.refference_code}}</b>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Company Name</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="padding-left: 10px !important;" class="text">
                          {{projectInfos.info.project_name}}
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Launching Date</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="padding-left: 10px !important;" class="text">
                          {{momentDateFormatting(projectInfos.info.project_start, 'DD MMMM YYYY')}}
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Location</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="padding-left: 10px !important;" class="text">
                          {{projectInfos.info.location_name}}
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Category</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="padding-left: 10px !important;" class="text">
                          {{projectInfos.info.project_type_desc}}
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                  <b-col lg="5" style="padding-left: 20px !important;">
                    <div style="padding: 5px;">
                      <b-row>
                        <b-col style="font-size: 18px;" v-if="paramFromList.isDashboardDev">
                          &nbsp;
                        </b-col>
                        <b-col v-else style="text-align: right; padding-right: unset !important;">
                          <div class="wrapper-last-edit">
                            <span>
                              {{momentUnix(projectInfos.info.updated_at, "DD MMM YYYY")}}
                            </span>
                            <span>
                              &nbsp; &nbsp; &nbsp;
                            </span>
                            <span>
                              <b>{{projectInfos.info.last_edit}}</b>
                            </span>
                          </div>
                          <ABSButton
                            text="Edit"
                            classButton="button button--new mgn"
                            styleButton="background-color: rgb(74, 147, 179); color: white;"
                            @click="showEdit"
                          />
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Token Required</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="" class="text">
                          <b>{{projectInfos.info.token_is_required ? 'Yes': 'No'}}</b>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Allow Referral</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="" class="text">
                          <b>{{projectInfos.info.allow_referral ? 'Yes': 'No'}}</b>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Token Value</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="" class="text">
                          <b>{{isCurrency(projectInfos.info.token_value, decimal)}}</b>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px;">
                        <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                          <b>Total NUP</b>
                        </b-col>
                        <b-col lg="6" xl="7" style="" class="text">
                          <b>{{isCurrency(projectInfos.info.total_nup, 0)}}</b>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>

          <b-row style="margin-top: 10px;">
            <b-col lg="2" align-self="center">
              <div style="height: 180px;
                background: #FFFFFF;
                border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;">
                
                <div style="
                  width: 90px;
                  height: 90px;
                  border: 12px solid #333399;
                  border-radius: 50%;
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);">
                  <div style="
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #333399;
                    font-size: 26px;">
                      <b>{{projectInfos.info.progress_percentage.split(".")[0]}}%</b>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 55px; color: rgba(0, 0, 0, 0.8); font-size: 11px;">
                  <b>Progress</b>
                </div>
              </div>              
            </b-col>
            <b-col lg="6" align-self="center">
              <div style="height: 180px;
                background: #FFFFFF;
                border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;
                padding: 5px;
                font-size: 11px;
                letter-spacing: 0.5px;">
                
                <b-row>
                  <b-col style="font-size: 18px;">
                    <b>Sales</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Outstanding Commission</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    {{checkNum(projectInfos.sales.commission? projectInfos.sales.commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", projectInfos.sales.commission)}}
                    {{checkDigit(projectInfos.sales.commission? projectInfos.sales.commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0")}}
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Total Cancelled Sales</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="" class="text">
                    <b>{{isCurrency(projectInfos.sales.cancel, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Unconfirmed Booking</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    <b>{{isCurrency(projectInfos.sales.unconfirmed, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Total Sales Lead</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    <b>{{isCurrency(projectInfos.sales.sales_lead, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Total Internal Marketing</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    <b>{{isCurrency(projectInfos.sales.internal, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Total Principle</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    <b>{{isCurrency(projectInfos.sales.principle, 0)}}</b>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="4" align-self="center">
              <div style="height: 180px;
                background: #FFFFFF;
                border: 1px solid rgba(45, 71, 175, 0.15);
                box-sizing: border-box;
                border-radius: 6px;
                padding: 5px;
                font-size: 11px;
                letter-spacing: 0.5px;">
                
                <b-row>
                  <b-col style="font-size: 18px;">
                    <b>Units</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: #333399;">
                    <b>Total Unit</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="color: #333399;">
                    <b>{{isCurrency(projectInfos.unit.total, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(2, 138, 32, 0.7)">
                    <b>Available Units</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="color: rgba(2, 138, 32, 0.7)" class="text">
                    <b>{{isCurrency(projectInfos.unit.available, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: #52A0FC">
                    <b>Reserved Unit</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="color: #52A0FC">
                    <b>{{isCurrency(projectInfos.unit.reserved, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: #FF0045;">
                    <b>Sold Unit</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="color: #FF0045;">
                    <b>{{isCurrency(projectInfos.unit.sold, 0)}}</b>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Sales Value</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    {{checkNum(projectInfos.unit.sales_value? projectInfos.unit.sales_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0", projectInfos.unit.sales_value)}}
                    {{checkDigit(projectInfos.unit.sales_value? projectInfos.unit.sales_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): "0")}}
                  </b-col>
                </b-row>
                <b-row style="margin-top: 5px;">
                  <b-col lg="6" xl="5" style="color: rgba(51, 51, 153, 0.7);">
                    <b>Brochure</b>
                  </b-col>
                  <b-col lg="6" xl="7" style="">
                    <ABSButton
                      text="View"
                      classButton="button button--new mgn"
                      styleButton="background-color: rgb(74, 147, 179); color: white;"
                      @click="showImage(projectInfos.info.upload_brochure)"
                    />
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>

          <!-- Tower -->
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <HOOList
                :prop="propListTower"
                :title="'Tower'"
                @rowClicked="showTower"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                ref="ref_tower"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                noCard
                isPoppins
                isHeaderFixed
              >
                <template slot="total_unit" slot-scope="data">
                  {{isCurrency(data.item.total_unit, 0)}}
                </template>
                <template slot="available" slot-scope="data">
                  {{isCurrency(data.item.available, 0)}}
                </template>
                <template slot="reserved" slot-scope="data">
                  {{isCurrency(data.item.reserved, 0)}}
                </template>
                <template slot="sold" slot-scope="data">
                  {{isCurrency(data.item.sold, 0)}}
                </template>
                <template slot="floor_plan" slot-scope="data">
                  <ABSButton
                    text="View"
                    classButton="button button--new mgn"
                    styleButton="background-color: rgb(74, 147, 179); color: white;"
                    @click="showImage(data.item.floor_plan)"
                  />
                </template>
              </HOOList>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>

          <!-- Sold Units -->
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <HOOList
                :prop="propListSoldUnits"
                :title="'Sold Units'"
                @rowClicked="rowClicked"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                ref="ref_sold_units"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                noCard
                isPoppins
                isHeaderFixed
                :cHeader="soldUnitHeader"
              >
                <template slot="selling_price" slot-scope="data">
                  {{isCurrency(data.item.selling_price, decimal)}}
                </template>
                <template slot="sales_date" slot-scope="data">
                  {{momentUnix(data.item.sales_date, "DD MMM YYYY")}}
                </template>
                <template slot="cancel_sales" slot-scope="data">
                  <ABSButton
                    text="View Details"
                    classButton="button button--new mgn"
                    styleButton="background-color: rgb(74, 147, 179); color: white;"
                    @click="soldUnitClick(data.item)"
                  />
                </template>
              </HOOList>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>

          <!-- Event -->
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <HOOList
                :prop="propListReleasePeriod"
                :title="'Event'"
                @rowClicked="showEvent"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                ref="ref_release_period"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                noCard
                isPoppins
                isHeaderFixed
              >
                <template slot="start_date" slot-scope="data">
                  {{momentUnix(data.item.start_date, "DD MMM YYYY")}}
                </template>
                <template slot="end_date" slot-scope="data">
                  {{momentUnix(data.item.end_date, "DD MMM YYYY")}}
                </template>
                <template slot="virtual_launching" slot-scope="data">
                  {{data.item.virtual_launching? "Yes": "No"}}
                </template>
                <template slot="total_unit" slot-scope="data">
                  {{isCurrency(data.item.total_unit, 0)}}
                </template>
                <template slot="sold_unit" slot-scope="data">
                  {{isCurrency(data.item.sold_unit, 0)}}
                </template>
              </HOOList>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>

          <!-- NUP -->
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <HOOList
                :prop="propListNUP"
                :title="'NUP'"
                @rowClicked="showNUP"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                ref="ref_nup"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                noCard
                isPoppins
                isHeaderFixed
              >
                <template slot="start_date" slot-scope="data">
                  {{momentUnix(data.item.start_date, "DD MMM YYYY")}}
                </template>
                <template slot="end_date" slot-scope="data">
                  {{momentUnix(data.item.end_date, "DD MMM YYYY")}}
                </template>
                <template slot="value" slot-scope="data">
                  {{isCurrency(data.item.value, decimal)}}
                </template>
                <template slot="refund_date" slot-scope="data">
                  {{momentDateFormatting(new Date(data.item.refund_date), "DD MMM YYYY")}}
                </template>
                <template slot="total_purchased" slot-scope="data">
                  {{isCurrency(data.item.total_purchased, 0)}}
                </template>
              </HOOList>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>

          <!-- Principle -->
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <HOOList
                :prop="propListPrinciple"
                :title="'Principle'"
                @rowClicked="showPrinciple"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                ref="ref_principle"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                noCard
                isPoppins
                isHeaderFixed
              >
                <template slot="token" slot-scope="data">
                  {{isCurrency(data.item.token, 0)}}
                </template>
                <template slot="nup" slot-scope="data">
                  {{isCurrency(data.item.nup, 0)}}
                </template>
                <template slot="assigned_unit" slot-scope="data">
                  {{isCurrency(data.item.assigned_unit, 0)}}
                </template>
                <template slot="sold_unit" slot-scope="data">
                  {{isCurrency(data.item.sold_unit, 0)}}
                </template>
                <template slot="outstd_commission" slot-scope="data">
                  IDR {{isCurrency(data.item.outstd_commission, decimal)}}
                </template>
              </HOOList>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>
          
          <!-- Monthly Sales -->
          <b-row>
            <b-col md="12" style="padding: unset !important;">
              <HOOList
                :prop="propListMonthlySales"
                :title="'Monthly Sales'"
                @rowClicked="rowClicked"
                @buttonDeleteClicked="doDeleteClick"
                @rowDblClicked="doDoubleClick"
                @rowLinkClick="rowLink"
                @pageSize="M_PageSize"
                @pagination="M_Pagination"
                @filter="M_Advance_Filter"
                @headTable="M_Head_Table"
                @refreshColumn="refreshColumn"
                ref="ref_monthly_sales"
                @buttonViewClicked="doViewClick"
                ButtonBackDisabled
                SearchDisabled
                noCard
                isPoppins
                isHeaderFixed
              >
                <template slot="sold_unit" slot-scope="data">
                  {{isCurrency(data.item.sold_unit, 0)}}
                </template>
                <template slot="sales_value" slot-scope="data">
                  {{isCurrency(data.item.sales_value, decimal)}}
                </template>
              </HOOList>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>
        </div>
      </div>

      <!-- Progress -->
      <div class="card">
        <div :class="'card__title'" style="border-bottom: unset !important;">
          <b-row>
            <b-col style="color: #4A93B3;" class="font-poppins">
              Progress
            </b-col>
            <b-col style="text-align: right">
              <span>
                <ABSButton
                  :text="'View All'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="doViewAllProgress"
                />
              </span>
            </b-col>
          </b-row>
        </div>
        <div class="card__body" style="padding-left: 5px !important; padding-right: 5px !important;">
          <b-row>
            <template v-for="(data, index) in progress">
              <b-col md="2" v-bind:key="index" @click="showProgress(data, index)">
                <b-row>
                  <b-col>
                    <b-img :src="urlHoonian + data.main_image" alt="" style="height: 100px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 18px; font-weight: bold;">
                    {{data.project_name}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 12px; color: #52A0FC;">
                    {{data.percentage_completed}}% Completed
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 12px; color: rgba(159, 162, 174, 0.7);">
                    {{momentUnix(data.created_at, "DD MMM YYYY")}}
                  </b-col>
                </b-row>
              </b-col>
            </template>
          </b-row>
        </div>
      </div>

      <!-- Promotion -->
      <div class="card">
        <div :class="'card__title'" style="border-bottom: unset !important;">
          <b-row>
            <b-col style="color: #4A93B3;" class="font-poppins">
              Promotion
            </b-col>
            <b-col style="text-align: right">
              <span>
                <ABSButton
                  :text="'View All'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="doViewAllPromotion"
                />
              </span>
            </b-col>
          </b-row>
        </div>
        <div class="card__body" style="padding-left: 15px !important; padding-right: 5px !important;">
          <b-row>
            <template v-for="(data, index) in promotion">
              <b-col md="3" v-bind:key="index" :style="`box-shadow: 2px 6px 11px -7px black; border-radius: 6px;
                -webkit-box-flex: 0;
                flex: 0 0 21%;
                padding: 0px !important;
                max-width: 21%;` + (index < promotion.length-1 ? 'margin-right: 5%;' : '')
              "  @click="showPromotion(data, index)">
                <b-row>
                  <b-col style="height: 18vw; padding: 0px !important;">
                    <b-img :src="urlHoonian + data.picture" alt="" style="height: 100%;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                    <div style="position: absolute;
                      top: 18px;
                      right: 0%;
                      background: #52A0FC;
                      border-radius: 5px;
                      width: 100px;
                      padding: 5px;
                      text-align: center;
                      font-size: 14px;
                      color: white;">
                      <b>{{data.total_buyer}} Buyers</b>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 15px; font-weight: bold;">
                    {{data.promotion_name}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 12px; color: #52A0FC;">
                    {{data.project_name}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 12px; color: #616161;">
                    {{momentUnix(data.start_datetime, "MMM YYYY")}} - {{momentUnix(data.end_datetime, "MMM YYYY")}}
                  </b-col>
                </b-row>
              </b-col>
            </template>
          </b-row>
        </div>
      </div>

      <!-- News Feed -->
      <div v-if="!paramFromList.isDashboardDev" class="card">
        <div :class="'card__title'" style="border-bottom: unset !important;">
          <b-row>
            <b-col style="color: #4A93B3;" class="font-poppins">
              News Feed
            </b-col>
            <b-col style="text-align: right">
              <span>
                <ABSButton
                  :text="'View All'"
                  classButton="button button--back"
                  classIcon="icon-style-1"
                  @click="doViewAllNewsFeed"
                />
              </span>
            </b-col>
          </b-row>
        </div>
        <div class="card__body" style="padding-left: 15px !important; padding-right: 5px !important;">
          <b-row>
            <template v-for="(data, index) in newsFeed">
              <b-col md="2" @click="showNewsFeed(data, index)">
                <b-row>
                  <b-col>
                    <b-img :src="urlHoonian + data.main_image" alt="" style="height: 100px;" fluid-grow rounded @error="onImageLoadFailure($event)" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 14px;">
                    {{data.title}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 10px; color: rgba(159, 162, 174, 0.7);">
                    {{momentUnix(data.created_at, "DD MMM YYYY")}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col style="font-size: 10px; color: rgba(0, 0, 0, 0.5);" class="text-7">
                    {{data.description}}
                  </b-col>
                </b-row>
              </b-col>
            </template>
          </b-row>
        </div>
      </div>

      <ABSModalImage id="Modal_Image" ref="Modal_Image" size="md" />

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectInfos: {
        info: {
          id: "",
          project_name: "",
          location_name: "",
          project_start: "",
          main_pic: "",
          progress_percentage: "",
          refference_code: "",
          company_group_name: "",
          icon_project: "",
          token_is_required: false,
          allow_referral: false,
          token_value: "",
          upload_brochure: "",
          total_nup: 0,
          project_type_desc: "",
          header_body_text_id: "",
        },
        sales: {
          commission: "",
          cancel: 0,
          unconfirmed: 0,
          sales_lead: 0,
          internal: 0,
          principle: 0
        },
        unit: {
          total: 0,
          available: 0,
          reserved: 0,
          sold: 0,
          sales_value: ""
        },
      },
      propListTower: {
        url: "/api/hoonian-website/dashboard/project-info/tower",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      propListSoldUnits: {
        url: "/api/hoonian-website/dashboard/project-info/sold",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      propListReleasePeriod: {
        url: "/api/hoonian-website/dashboard/project-info/release-period",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      propListNUP: {
        url: "/api/hoonian-website/dashboard/project-info/nup",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      propListPrinciple: {
        url: "/api/hoonian-website/dashboard/project-info/principle",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      propListMonthlySales: {
        url: "/api/hoonian-website/dashboard/project-info/monthly-sales",
        initialWhere: "",
        SortField: "",
        SortBy: "",
        ParamWhere: "",
      },
      progress: [],
      promotion: [],
      newsFeed: [],
      soldUnitHeader: [
        {
          key: "no",
          label: "No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "tower",
          label: "Tower",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "unit_no",
          label: "Unit No",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "buyer_name",
          label: "Buyer Name",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "principle_name",
          label: "Principle Name",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "selling_price",
          label: "Selling Price",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "sales_date",
          label: "Sales Date",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "cancel_sales",
          label: "Cancel Sales",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
      ],
    };
  },
  computed: {
    paramFromList() {
      let param = this.$store.getters.getParamPage;
      if (param == null || param == undefined) {
        this.doBack();
      } else {
        if (Object.keys(param).length < 1) {
          this.doBack();
        } else {
          return param;
        }
      }
    },
  },
  methods: {
    showImage(pathUrl) {
      this.$refs.Modal_Image._show(this.urlHoonian + pathUrl);
    },
    getProjectDetail() {
      let param = {
        project_id: this.paramFromList.project_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/project-info/detail",
        param
      ).then((response) => {
        if (response == null) return;
        this.projectInfos = response.data;

        if (!this.paramFromList.isDashboardDev) {
          this.propListReleasePeriod.url = "/api/hoonian-website/dashboard/operation-detail/event-release-period/list";
          this.propListReleasePeriod.param = {header_body_text_id: this.projectInfos.info.header_body_text_id};
          this.$refs.ref_release_period.doGetList("");
        }
      });
    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    rowClicked(record, index) {
      this.doViewClick(record, index);
    },
    doViewClick(record, index) {
      // if (this.ButtonStatus == null) return
      // var param = record;
      // param.isEdit = true;
      // param.isView = true;
      // this.$store.commit("setParamPage", param);
      // this.$router.push({ name: "PJ_PromotionMasterForm" });
    },
    getProgress() {
      let param = {
        project_id: this.paramFromList.project_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-project-progress",
        param
      ).then((response) => {
        if (response == null) return;
        this.progress = response.data.list;
      });
    },
    getPromotion() {
      let param = {
        project_id: this.paramFromList.project_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-promotion",
        param
      ).then((response) => {
        if (response == null) return;
        this.promotion = response.data.list;
      });
    },
    getNewsFeed() {
      let param = {
        project_id: this.paramFromList.project_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/hoonian-website/dashboard/dashboard-news",
        param
      ).then((response) => {
        if (response == null) return;
        this.newsFeed = response.data.list;
      });
    },
    getDataList() {
      this.$refs.ref_tower.doGetList("");
      this.$refs.ref_sold_units.doGetList("");
      if (this.paramFromList.isDashboardDev)
        this.$refs.ref_release_period.doGetList("");
      this.$refs.ref_nup.doGetList("");
      this.$refs.ref_principle.doGetList("");
      this.$refs.ref_monthly_sales.doGetList("");
    },
    showDescription() {
      let param = this.paramFromList;
      param.header_body_text_id = this.projectInfos.info.header_body_text_id;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectDescription" });
    },
    showEvent(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);

      let form = "OP_ProjectEventForm";
      if (record) {
        if (record.status.toLowerCase() == 'confirmed')
          form = "OP_ProjectEventConfirm";
      }
      this.$router.push({ name: form });
    },
    showNUP(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectNUP" });
    },
    showPrinciple(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectPrincipleForm" });
    },
    doViewAllProgress() {
      let param = this.paramFromList;
      param.showEdit = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "DD_Progress"});
    },
    showProgress(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectProgressForm" });
    },
    showPromotion(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectPromotionForm" });
    },
    doViewAllPromotion() {
      let param = this.paramFromList;
      param.showEdit = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "DD_Promotion"});
    },
    showNewsFeed(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_NewsFeedForm" });
    },
    doViewAllNewsFeed() {
      let param = this.paramFromList;
      param.showEdit = true;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_NewsFeed"});
    },
    showTower(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_Tower" });
    },
    soldUnitClick(record, index) {
      let param = this.paramFromList;
      param.isEdit = record? true: false;
      param.DetailList = record;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "OP_ProjectSoldUnitForm" });
    },
    showEdit() {
      this.$router.push({ name: "OP_ProjectDetailForm" });
    },
  },
  mounted() {
    this.propListTower.initialWhere = this.paramFromList.project_id;
    this.propListSoldUnits.initialWhere = this.paramFromList.project_id;
    this.propListReleasePeriod.initialWhere = this.paramFromList.project_id;
    this.propListNUP.initialWhere = this.paramFromList.project_id;
    this.propListPrinciple.initialWhere = this.paramFromList.project_id;
    this.propListMonthlySales.initialWhere = this.paramFromList.project_id;

    this.getProjectDetail();
    this.getDataList();
    this.getProgress();
    this.getPromotion();
    this.getNewsFeed();
  }
};
</script>
<style scoped>
.text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
.text-7 {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 7;
   -webkit-box-orient: vertical;
}
.no-padding {
  padding: unset !important;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>