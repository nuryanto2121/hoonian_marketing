<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
         <b-row style="margin-top: 20px;">
           <b-col style="text-shadow: 1.2px 0px;">
             {{paramFromList.projectName}}
           </b-col>
         </b-row>
         <b-row style="margin-top: 20px;">
           <b-col style="">
             <span style="text-shadow: 1.2px 0px;">{{Model.data.tower_cluster_name}}</span>
             <br />
             {{Model.data.unit_type_name}}
           </b-col>
         </b-row>
         
         <b-row style="margin-top: 20px;">
           <b-col style="padding: unset !important;">
             <b-img :src="urlHoonian + Model.data.big_image" alt=""
                :style="`height: 340px;`"
                fluid-grow @error="onImageLoadFailure($event)" />
           </b-col>
         </b-row>
         
         <b-row style="padding-top: 20px; background: #F8F8F8;">
          <b-col style="overflow-x: auto; white-space: nowrap; display: block !important; padding: unset !important;">
            <template v-for="(data, index) in Model.image">
              <b-row v-bind:key="index" style="display: inline-block !important; padding-bottom: 10px;">
                <b-col style="padding: unset !important; padding-right: 15px !important;">
                  <b-img :src="urlHoonian + data.thumbnail_image" alt=""
                    :style="`height: 120px; width: 120px; cursor: pointer;`"
                    @error="onImageLoadFailure($event)" @click="changeImage(data.thumbnail_image)" />
                </b-col>
              </b-row>
            </template>
          </b-col>
        </b-row>

        <div style="padding: 10px; background: #F8F8F8;">
          <b-row align-v="center" style="height: 45px; cursor: pointer; background: rgba(0, 0, 0, 0.2); color: white;" @click="openFloorPlan">
            <b-col cols="1" style="padding: 10px !important;">
              <b-img :src="require('@/assets/icon-svg/floor_plan.svg')" alt="" style=""/>
            </b-col>
            <b-col style="padding: 5px !important; text-align: center;">
              {{ $t('floor_plan') }}
            </b-col>
          </b-row>
          <b-row align-v="center" style="height: 45px; cursor: pointer; background: rgba(0, 0, 0, 0.2); color: white; margin-top: 5px;" @click="open360VR">
            <b-col cols="1" style="padding: 10px !important;">
              <b-img :src="require('@/assets/icon-svg/vr.svg')" alt="" style=""/>
            </b-col>
            <b-col style="padding: 5px !important; text-align: center;">
              360<sup>o</sup> {{ $t('vr') }}
            </b-col>
          </b-row>
          <b-row align-v="center" style="height: 45px; cursor: pointer; background: rgba(0, 0, 0, 0.2); color: white; margin-top: 5px;" @click="openLayout">
            <b-col cols="1" style="padding: 10px !important;">
              <b-img :src="require('@/assets/icon-svg/layout.svg')" alt="" style=""/>
            </b-col>
            <b-col style="padding: 5px !important; text-align: center;">
              {{ $t('layout') }}
            </b-col>
          </b-row>
          <b-row align-v="center" style="height: 45px; cursor: pointer; background: rgba(0, 0, 0, 0.2); color: white; margin-top: 5px;" @click="openBrochure">
            <b-col cols="1" style="padding: 10px !important;">
              <b-img :src="require('@/assets/icon-svg/e_brochure.svg')" alt="" style=""/>
            </b-col>
            <b-col style="padding: 5px !important; text-align: center;">
              {{ $t('e_brochure') }}
            </b-col>
          </b-row>
        </div>

        <b-row style="padding-top: 10px; background: #F8F8F8;">
          <b-col offset="2" offset-sm="3" cols="8">
            <b-row>
              <b-col cols="3">
                <ShareNetwork
                  network="facebook"
                  :url="urlHoonian + Model.data.main_pic"
                  :title="Model.share.title"
                  description="Hoonian"
                  :quote="Model.share.title"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/facebook_white.svg')" alt="" style=""/>
                </ShareNetwork>
              </b-col>
              <b-col cols="3">
                <ShareNetwork
                  network="twitter"
                  :url="urlHoonian + Model.data.main_pic"
                  :title="Model.share.title"
                  description="Hoonian"
                  :quote="Model.share.title"
                  hashtags="hoonian"
                >
                  <b-img :src="require('@/assets/icon-svg/twitter_white.svg')" alt="" style=""/>
                </ShareNetwork>
              </b-col>
              <b-col cols="3">
                <b-img :src="require('@/assets/icon-svg/whatsapp_white.svg')" alt="" style="cursor: pointer;" @click="doWhatsapp"/>
              </b-col>
              <b-col cols="3">
                <b-img :src="require('@/assets/icon-svg/email_white.svg')" alt="" style="cursor: pointer;" @click="doEmail"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        
        <b-row style="padding-top: 10px; background: #F8F8F8;">
          <b-col style="text-shadow: 1.2px 0px; font-size: 22px;">
            {{ $t('unit_details') }}
          </b-col>
        </b-row>

        <b-row style="padding-top: 10px; padding-bottom: 20px; background: #F8F8F8;">
          <b-col style="padding: unset !important; padding-right: 5px !important;">
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('total_units') }}
               </b-col>
               <b-col style="text-align: right;">
                 {{Model.data.count}}
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('bedrooms') }}
               </b-col>
               <b-col style="text-align: right;">
                 {{Model.data.total_bedroom}}
                 <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" />
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('bathrooms') }}
               </b-col>
               <b-col style="text-align: right;">
                 <span style="margin-right: 5px;">
                   {{Model.data.total_bathroom}}
                 </span>
                 <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" />
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('net_area') }}
               </b-col>
               <b-col style="text-align: right;">
                 {{Model.data.net_area}}
                 m<sup>2</sup>
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('gross_area') }}
               </b-col>
               <b-col style="text-align: right;">
                 {{Model.data.gross_area}}
                 m<sup>2</sup>
               </b-col>
             </b-row>
             
           </b-col>
        </b-row>

         <b-row style="background: white; padding-top: 20px; margin-top: 10px;">
           <b-col style="padding: unset !important;">
             <b-row style="font-size: 14px; border: 1px solid #4A93B3; box-sizing: border-box; padding: 5px 10px; padding-right: 0px;">
               <b-col class="text-shadow-12">
                  Booking Fee
               </b-col>
               <b-col style="color: #2F80ED; text-align: right;">
                 IDR {{ isCurrency(Model.data.booking_fee, 0) }}
               </b-col>
             </b-row>
             <b-row style="margin-top: 20px;">
                <b-col cols="12" class="noPadding">
                  <HOODropDown
                    @change="Onpayment_methodChange"
                    :prop="PI_payment_method"
                    v-model="payment_method"
                    :label="payment_methodLabel"
                    ref="ref_payment_method"
                  />
                </b-col>
             </b-row>
             <b-row style="font-size: 14px; margin-top: 20px;">
               <b-col cols="6">
                 <span style="cursor: pointer; padding-bottom: 5px;" :style="type == 'all' ? 'color: #4A93B3; border-bottom: 2px solid;': 'color: #b5b5b5;'" @click="changeType('all')">
                   ALL
                 </span>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span style="cursor: pointer; padding-bottom: 5px;" :style="type == 'available' ? 'color: #219653; border-bottom: 2px solid;': 'color: #b5b5b5;'" @click="changeType('available')">
                   AVAILABLE
                 </span>
               </b-col>
               <b-col cols="6" style="text-align: right; font-size: 12px;">
                 <span style="cursor: pointer; text-shadow: 0.5px 0px" @click="changeType('buyer')">
                   <span style="width: 8px; height: 8px; background: #56CCF2;">
                   &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  &nbsp;&nbsp;
                  YOUR BUYER
                 </span>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px;">
               <b-col style="padding: unset !important;">
                 <HOOList
                    :prop="propList"
                    :title="''"
                    @rowClicked="rowClicked"
                    @buttonDeleteClicked="doDeleteClick"
                    @rowDblClicked="doDoubleClick"
                    @rowLinkClick="rowLink"
                    @pageSize="M_PageSize"
                    @pagination="M_Pagination"
                    @filter="M_Advance_Filter"
                    @headTable="M_Head_Table"
                    @refreshColumn="refreshColumn"
                    :cHeader="unitListHeader"
                    ref="ref_list"
                    @buttonViewClicked="doViewClick"
                    ButtonBackDisabled
                    SearchDisabled
                    isHeaderFixed
                    noCard
                    removeCardTitle
                    removePaddingTopBody
                    @onRenderData="UnitListRender"
                  >
                    <template slot="unit_no" slot-scope="data">
                      <span style="color: #4A93B3">
                        {{data.item.unit_no}}
                      </span>
                    </template>
                    <template slot="net_area" slot-scope="data">
                      {{data.item.net_area}} m<sup>2</sup>
                    </template>
                    <template slot="gross_area" slot-scope="data">
                      {{data.item.net_area}} m<sup>2</sup>
                    </template>
                    <template slot="head_total_bedroom" slot-scope="data">
                      <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" style=""/>
                    </template>
                    <template slot="head_total_bathroom" slot-scope="data">
                      <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" style=""/>
                    </template>
                    <template slot="direction" slot-scope="data">
                      <b-row>
                        <b-col align-self="center">
                          {{data.item.direction}}
                        </b-col>
                        <b-col>
                          <b-img :src="require('@/assets/icon-svg/description.svg')" alt="" style="" @click.stop="showDescription(data.item)" />
                        </b-col>
                      </b-row>
                    </template>
                    <template slot="price" slot-scope="data">
                      <b-row>
                        <b-col :class="data.item.is_buyer? 'table-info': ''" style="display: flex; align-items: center;">
                          IDR {{ isCurrency(data.item.price, 0) }}
                        </b-col>
                        <b-col cols="2">
                          <b-img :src="require('@/assets/icon-svg/calculator.svg')" alt="" style="" @click.stop="showCalculator(data.item)" />
                        </b-col>
                        <b-col cols="1">
                          &nbsp;
                        </b-col>
                      </b-row>
                    </template>
                    <template slot="status" slot-scope="data">
                      <b-row>
                        <b-col align-self="center" :cols="data.item.status == AVAILABLE || data.item.status == BOOKED || data.item.booking_type == UNRELEASED ? 4: 12"
                          style="padding-left: unset !important;">
                          <span :style="data.item.status == AVAILABLE? 'color: #219653;':
                                      (data.item.status == SOLD? 'color: #EB5757;': 'color: #F2C94C;')">
                            <span style="text-shadow: 0.5px 0px;">
                              {{data.item.status}}
                            </span>
                          </span>
                        </b-col>
                        <b-col v-if="data.item.status == AVAILABLE || data.item.status == BOOKED || data.item.booking_type == UNRELEASED">
                          <ABSButton
                            :text="data.item.status == AVAILABLE || data.item.booking_type == UNRELEASED? 'Reservation' :
                                  (data.item.status == BOOKED? 'Waiting List': '')"

                            :classButton="data.item.status == AVAILABLE || data.item.booking_type == UNRELEASED? 'btn btn--default' :
                                        (data.item.status == BOOKED? 'btn btn--yellow': '')"
                            classIcon="icon-style-1"
                            @click="doReservationOrBooked(data.item)"
                            styleButton="height: 30px; width: 100%;"
                            :disabled="disabledButtonStatus(data)"
                          />
                        </b-col>
                      </b-row>
                    </template>
                  </HOOList>
                  <ABSModal id="Modal_Calculator" ref="Modal_Calculator" >
                    <template slot="headerTitle">
                      <span class="title-primary" style="margin: 12px 12px; font-size: 20px"> {{ $t('loan_calculator')}} </span>
                    </template>
                    <template slot="content">
                      <b-row v-if="dataRowClick">
                        <b-col md="12" style="padding-left: unset !important; padding-right: unset !important;">
                          <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                            <b-row style="text-shadow: 0.5px 0px; font-size: 18px;">
                              <b-col cols="12">
                                {{ $t('unit_no') }}
                                <br />
                                <span style="color: #4A93B3; font-size: 26px">
                                  <b>{{dataRowClick.unit_no}}</b>
                                </span>
                              </b-col>
                              <b-col cols="12">
                                {{ $t('unit_price') }}
                                <br />
                                <span style="color: #4A93B3; font-size: 26px">
                                  <b>IDR {{ isCurrency(dataRowClick.price, 0) }}</b>
                                </span>
                              </b-col>
                            </b-row>
                            <b-row style="margin-top: 20px;">
                              <b-col cols="12">
                                <span>
                                  <label class="lbl-poppins">{{ $t('loan_percentage') }} (%)</label>
                                </span>
                                <ACCTextBox
                                  :prop="PI_loan_percentage"
                                  v-model="Calculate.loan_percentage"
                                  ref="ref_loan_percentage"
                                  @input="onLoanPercentage"
                                />
                              </b-col>
                              <b-col cols="12">
                                <span>
                                  <label class="lbl-poppins">{{ $t('interest') }} (%)</label>
                                </span>
                                <ACCTextBox
                                  :prop="PI_interest"
                                  v-model="Calculate.interest"
                                  ref="ref_interest"
                                />
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col cols="12">
                                <span>
                                  <label class="lbl-poppins">{{ $t('loan_amount') }}</label>
                                </span>
                                <ACCTextBox
                                  :prop="PI_loan_amount"
                                  v-model="Calculate.loan_amount"
                                  ref="ref_loan_amount"
                                  @input="onLoanAmount"
                                />
                              </b-col>
                              <b-col cols="12">
                                <span>
                                  <label class="lbl-poppins">{{ $t('tenor') }}</label>
                                </span>
                                <ACCTextBox
                                  :prop="PI_tenor"
                                  v-model="Calculate.tenor"
                                  ref="ref_tenor"
                                />
                              </b-col>
                            </b-row>
                            <b-row style="margin-top: 20px;">
                              <b-col offset-sm="4" sm="4">
                                <ABSButton
                                  :text="$t('calculate')"
                                  classButton="btn btn--default"
                                  classIcon="icon-style-1"
                                  @click="doCalculate"
                                  styleButton="height: 40px; width: 100%;"
                                />
                              </b-col>
                            </b-row>
                            <b-row style="margin-top: 20px;">
                              <b-col offset-sm="2" sm="8" v-if="showMonthlyInstallment"
                                style="background: #F2F2F2; text-align: center; text-shadow: 0.5px 0px; font-size: 18px; padding-top: 20px !important; padding-bottom: 20px !important;">
                                <span>
                                  <label>{{ $t('monthly_installment') }}</label>
                                </span>
                                <br />
                                <span style="color: #4A93B3">
                                  {{'IDR ' + isCurrency(monthlyInstallment, 2) }}
                                </span>
                              </b-col>
                            </b-row>
                          </b-form>
                        </b-col>
                      </b-row>
                    </template>
                  </ABSModal>
                  <ABSModal id="Modal_Payment" ref="Modal_Payment" size="sm" @modalCancelClicked="closePayment()">
                    <template slot="headerTitle">
                      <span class="title-primary"> {{ $t('virtual_account') }} </span>
                    </template>
                    <template slot="content">
                      <b-row v-for="(data, index) in virtualAccount.virtual_accounts" :key="index">
                        <b-col md="12">
                          <div style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                            <b-row style="margin-top: 10px;">
                              <b-col md="6" style="padding: 10px;">
                                <b-img :src="urlHoonian + data.bank_icon" alt="" width="100%" @error="onImageLoadFailure($event)" />
                              </b-col>
                              <b-col align-self="center" md="6">
                                <div>{{data.bank_name}}</div>
                                <div style="color: #4A93B3;">{{data.virtual_account_no}}</div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 20px;">
                        <b-col style="text-align: center;">
                          <span>
                            <label class="lbl-poppins">{{ $t('please_pay_in') }}</label>
                          </span>
                          <br />
                          <div style="color: #4A93B3;">{{pleasePayIn}}</div>
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 20px;">
                        <b-col>
                          <ABSButton
                            :text="$t('close')"
                            classButton="btn btn--default"
                            classIcon="icon-style-1"
                            @click="doBack"
                            styleButton="height: 40px; width: 100%;"
                          />
                        </b-col>
                      </b-row>
                    </template>
                  </ABSModal>
                  <ABSModal id="Modal_BuyerDetails" ref="Modal_BuyerDetails" size="lg">
                    <template slot="headerTitle">
                      <span class="title-primary"> {{ $t('buyer_details') }} </span>
                    </template>
                    <template slot="content" v-if="dataBuyerDetail">
                      <b-row style="font-size: 15px !important;">
                        <b-col sm="6" style="padding-left: unset !important;">
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('id_no') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.id_no}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('buyer_name') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.name}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.handphone}}
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col>
                          <label class="lbl-poppins">{{ $t('id_picture') }}</label>
                          <br />
                          <b-img :src="urlHoonian + dataBuyerDetail.info.ktp_image" alt="" width="100%" @error="onImageLoadFailure($event)" />
                        </b-col>
                      </b-row>
                      <b-row class="row-view" style="margin-top: 20px;">
                        <b-col>
                          <span class="title-primary"> {{ $t('unit_details') }} </span>
                        </b-col>
                      </b-row>
                      <b-row style="font-size: 15px !important;">
                        <b-col sm="6" style="padding-left: unset !important;">
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('project_name') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.project_name}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('unit_no') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.unit_no}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('unit_type') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.unit_type_name}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('date') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{momentUnix(dataBuyerDetail.info.purchase_date, "DD MMM YYYY")}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('price') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              IDR {{ isCurrency(dataBuyerDetail.info.price, 0) }}
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('booking_fee') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              IDR {{ isCurrency(dataBuyerDetail.info.booking_fee, 0) }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('tower') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ dataBuyerDetail.info.tower_cluster_name }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('floor') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ dataBuyerDetail.info.block_floor_name }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('status') }}</label>
                            </b-col>
                            <b-col :style="dataBuyerDetail.info.status == AVAILABLE? 'color: #219653;':
                                    (dataBuyerDetail.info.status == SOLD? 'color: #EB5757;': 'color: #F2C94C;')">
                              {{ dataBuyerDetail.info.status? dataBuyerDetail.info.status.toUpperCase(): "" }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col sm="4">
                              <label class="lbl-poppins">{{ $t('commission') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              IDR {{ isCurrency(dataBuyerDetail.info.marketing_commission, 0) }}
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                      <b-row class="row-view" style="margin-top: 20px;">
                        <b-col>
                          <span class="title-primary"> {{ $t('virtual_account') }} </span>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="4" v-for="(data, index) in dataBuyerDetail.virtual_accounts" :key="index">
                          <div style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                            <b-row style="margin-top: 10px;">
                              <b-col md="6" style="padding: 10px;">
                                <b-img :src="urlHoonian + data.bank_icon" alt="" width="100%" @error="onImageLoadFailure($event)" />
                              </b-col>
                              <b-col align-self="center" md="6">
                                <div>{{data.bank_name}}</div>
                                <div style="color: #4A93B3;">{{data.virtual_account_no}}</div>
                              </b-col>
                            </b-row>
                          </div>
                        </b-col>
                      </b-row>
                    </template>
                  </ABSModal>
               </b-col>
             </b-row>
             <b-row style="margin-top: 10px; background: #F8F8F8; padding-top: 10px;">
               <b-col style="text-shadow: 0.5px 0px; font-size: 18px;">
                 {{ $t('other_suggestion') }}
               </b-col>
             </b-row>
             <b-row style="padding-top: 10px; background: #F8F8F8;">
              <b-col style="overflow-x: auto; white-space: nowrap; display: block !important; padding-bottom: 5px;">
                <template v-for="(item, index) in OtherSuggestion">
                  <div class="card width-other-suggestion" v-bind:key="index" style="display: inline-block !important;">
                    <div class="card__body" style="padding: unset !important;">
                      <b-row>
                        <b-col style="padding: unset !important;">
                          <b-img :src="urlHoonian + item.thumbnail_image" alt=""
                          :style="`height: 180px; cursor: pointer; position: relative;`"
                          fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 10px; padding: 0px 10px;">
                        <b-col style="font-size: 11.5px; text-shadow: 0.5px 0px; letter-spacing: 0.16em;" class="text-single">
                          {{item.tower_cluster_name}}
                          -
                          {{cutWord(item.unit_type, 6)}}...
                        </b-col>
                        <b-col cols="4" style="font-size: 12px; text-align: right;">
                          <b-img :src="require('@/assets/icon-svg/map-pin.svg')" alt="" style="" />
                          {{item.location_name}}
                        </b-col>
                      </b-row>
                      <b-row style="margin-top: 5px !important; padding: 0px 10px;">
                        <b-col style="font-size: 12px; text-shadow: 0.5px 0px;">
                          {{ $t('start_from') }} IDR {{ isCurrency(item.start_from_price, 0) }}
                        </b-col>
                      </b-row>
                      <b-row style="padding: 0px 10px;">
                        <b-col style="font-size: 11px;">
                          {{ isCurrency(item.price_per_meter_square,0) }} / m<sup>2</sup>
                        </b-col>
                      </b-row>
                      <b-row style="font-size: 11px; padding: 20px 10px;">
                        <b-col cols="3">
                          <b-img :src="require('@/assets/icon-svg/house.svg')" alt="" style="" />
                          {{item.total}} {{ $t('units') }}
                        </b-col>
                        <b-col cols="4" style="text-align: right;">
                          | &nbsp;
                          <b-img :src="require('@/assets/icon-svg/bed.svg')" alt="" style="" />
                          {{item.total_bedroom}} BR
                        </b-col>
                        <b-col cols="5" style="">
                          | &nbsp;
                          <b-img :src="require('@/assets/icon-svg/resize.svg')" alt="" style="" />
                          {{item.net_area}} m<sup>2</sup>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </template>
              </b-col>
            </b-row>
           </b-col>
         </b-row>
        </b-col>
      </b-row>
    </div>
    <MKBuyerDetailReserve ref="Modal_BuyerDetailReserve" />
    <MKUnitTypeDescription ref="Modal_UnitTypeDescription" />
  </div>
</template>
<script>
import MKBuyerDetailReserve from "./MK_BuyerDetailReserve";
import MKUnitTypeDescription from "./MK_UnitTypeDescription";
export default {
  components: {
    MKBuyerDetailReserve,
    MKUnitTypeDescription,
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
    AVAILABLE() {
      return "Available";
    },
    BOOKED() {
      return "Booked";
    },
    SOLD() {
      return "Sold";
    },
    V_LAUNCHING() {
      return "V-Launching";
    },
    UNRELEASED() {
      return "unreleased";
    },
  },
  watch: {
  },
  data() {
    return {
      Model: {
        data: {project_status: "", location_name: "", project_name: "", tower_cluster_name: "", unit_type_name: "",},
        image: [],
        share: {title: "", body: "",},
      },
      Calculate: {
        loan_percentage: 0,
        interest: 0,
        loan_amount: 0,
        tenor: 0,
      },
      virtualAccount: {},
      propList: {
        url: "/api/marketing-website/project/unit-type/unit-list",
        initialWhere: "",
        SortField: "",
        SortBy: "desc",
        ParamWhere: "",
        param: {
          unit_type_id: "",
          marketing_agent_id: "",
          tower_cluster_id: "",
          type: "",
          lang_id: this.getDataUser().lang_id,
          principle_id: this.getDataUser().principle_id,
          payment_method_id: ""
        }
      },
      unitListHeader: [
        {
          key: "unit_no",
          label: "UNIT",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center XS poppins text-shadow-02",
        },
        {
          key: "block_floor_name",
          label: "FLOOR",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins text-shadow-02",
        },
        {
          key: "net_area",
          label: "NET AREA",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins text-shadow-02",
        },
        {
          key: "gross_area",
          label: "SEMI-GROSS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins text-shadow-02",
        },
        {
          key: "total_bedroom",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins text-shadow-02",
          isCustom: true,
        },
        {
          key: "total_bathroom",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins text-shadow-02",
          isCustom: true,
        },
        {
          key: "direction",
          label: "DIRECTION",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left S poppins text-shadow-02",
        },
        {
          key: "price",
          label: "PRICE",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins remove-padding",
          thClass: "HeaderACCList2 th-cus-left L poppins text-shadow-02",
        },
        {
          key: "status",
          label: "STATUS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left XL poppins text-shadow-02",
        },
      ],
      type: "all",
      dataRowClick: undefined,
      dataBuyerDetail: { info: {}, virtual_accounts: [],},
      PI_loan_percentage: {
        cValidate: "required",
        cName: "Loan Percentage",
        cOrder: 1,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_interest: {
        cValidate: "required",
        cName: "Interest",
        cOrder: 2,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_loan_amount: {
        cValidate: "required",
        cName: "Loan Amount",
        cOrder: 3,
        cKey: false,
        cType: "decimal",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 0,
        cInputStatus: "new"
      },
      PI_tenor: {
        cValidate: "required",
        cName: "tenor",
        cOrder: 4,
        cKey: false,
        cType: "numeric",
        cProtect: false,
        cParentForm: "FormEntry",
        cDecimal: 0,
        cInputStatus: "new"
      },
      
      showMonthlyInstallment: false,
      monthlyInstallment: 0,
      pleasePayIn: "",
      intervalPleasePayIn: undefined,
      OtherSuggestion: [],
      fields: {
        unit_no: 'info',
        block_floor_name: 'info',
        net_area: 'info',
        gross_area: 'info',
        total_bedroom: 'info',
        total_bathroom: 'info',
        direction: 'info',
        // price: 'info',
      },
      PI_payment_method: {
        dataLookUp: {
          url: "/api/hoonian-website/payment-method-lookup",
          param: {
            project_id: "",
          }
        },
        cValidate: "",
        cName: "payment method",
        ckey: false,
        cOrder: 1,
        cProtect: false,
        cParentForm: "FormEntry",
        cStatic: false,
        cOption: [],
        cDisplayColumn: "",
        cInputStatus: this.inputStatus,
        callback: this.callbackDropdown,
      },
      payment_method: "",
      payment_methodLabel: "",
    }
  },
  methods: {
    showDescription(data) {
      this.$refs.Modal_UnitTypeDescription.showDescription(data.remarks);
    },
    callbackDropdown(data) {
      if (data.length > 0) {
        this.payment_method = data[0].id;
        this.payment_methodLabel = data[0].label;
        this.getUnitTypeDetail();
      }
    },
    Onpayment_methodChange(data) {
      this.$nextTick(() => {
        this.payment_method = data.id;
        this.payment_methodLabel = data.label;
        this.getUnitTypeDetail();
      })
    },
    disabledButtonStatus(data) {
      let disabled = false;
      if (data.item.booking_type == this.UNRELEASED) {
        disabled = true;
      } else if (data.item.status == this.SOLD || data.item.status == this.BOOKED) {
        // disabled = false;
      } else if (data.item.status == this.V_LAUNCHING) {
        disabled = true;
      } else if (data.item.status == this.AVAILABLE) {
        // disabled = false;
      }
      return disabled;
    },
    UnitListRender(data) {
      data.forEach(el => {
        if (el.is_buyer) {
          el._cellVariants = this.fields;
        }
      });
    },
    onLoanPercentage(data){
      this.Calculate.loan_amount = (this.replaceAllString(this.Calculate.loan_percentage, ',', '', 'number') * this.dataRowClick.price / 100).toFixed(0);
      this.Calculate.loan_amount = this.isCurrency(this.Calculate.loan_amount, 2);
    },
    onLoanAmount(){
      this.Calculate.loan_percentage = (this.replaceAllString(this.Calculate.loan_amount, ',', '', 'number') * 100 / this.dataRowClick.price).toFixed(2);
      this.Calculate.loan_percentage = this.isCurrency(this.Calculate.loan_percentage, 2);
    },
    changeImage(path) {
      this.Model.data.big_image = path;
      this.$forceUpdate();
    },
    timerPleasePayIn() {
      this.intervalPleasePayIn = setInterval(() => {
        let now = new Date();
        let hour = this.isCurrency(this.unixTimeDifference(this.momentDateToUnix(this.momentDateFormatting(now, 'YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss'), this.virtualAccount.expired_at).hours, 0);
        let minute = this.isCurrency(this.unixTimeDifference(this.momentDateToUnix(this.momentDateFormatting(now, 'YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss'), this.virtualAccount.expired_at).minutes, 0);
        this.pleasePayIn = `${hour} Hours: ${minute} Minutes`;
      }, 1000);
    },
    doCalculate() {
      this.$validator._base.validateAll("FormEntry").then((result) => {
        if (!result) return;
        // this.alertConfirmation("Are You Sure Want To Calculate This Data ?").then(
        //   (ress) => {
        //     if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              this.calculate();
        //     }
        //   }
        // );
      });
    },
    calculate() {
      // let loanAmount = this.dataRowClick.price * +this.replaceAllString(this.Calculate.loan_percentage, ',', '', 'number');
      let loanPercentage = this.replaceAllString(this.Calculate.loan_percentage, ',', '', 'number');
      let unitPrice = this.replaceAllString(this.dataRowClick.price, ',', '', 'number');
      let loanAmount = this.replaceAllString(this.Calculate.loan_amount, ',', '', 'number');
      
      
      let pmt = this.pmt(
        // interest akan dihitung dalam %, jadi dibagi 100 dan dibagi 12 dari tahun ke bulan
        this.replaceAllString(this.Calculate.interest, ',', '', 'number') / (12*100),
        this.replaceAllString(this.Calculate.tenor, ',', '', 'number'),
        (loanAmount == 0) ? loanPercentage * unitPrice / 100 : loanAmount,
        0
      )
      this.monthlyInstallment = pmt;
      this.showMonthlyInstallment = true;
    },
    closePayment() {
    },
    doReservationOrBooked(data) {
      data.tower_cluster_name = this.Model.data.tower_cluster_name;
      data.unit_type_name = this.Model.data.unit_type_name;
      data.isMobile = true;
      data.payment_method_id = this.payment_method;
      this.$refs.Modal_BuyerDetailReserve.doReservationOrBooked(data);
    },
    showCalculator(data) {
      this.dataRowClick = data;
      this.Calculate = {
        loan_percentage: 0,
        interest: 0,
        loan_amount: 0,
        tenor: 0,
      },
      this.$refs.Modal_Calculator._show();
    },
    doWaitingList() {

    },
    rowClicked(data) {
      if (!data.is_buyer) return;
      this.dataRowClick = data;
      this.showBuyerDetails();
    },
    setPropList() {
      this.propList.initialWhere = this.paramFromList.id;
      this.propList.param.unit_type_id = this.paramFromList.availableUnitTypes.id;
      this.propList.param.marketing_agent_id = this.getDataUser().marketing_id;
      this.propList.param.tower_cluster_id = this.Model.data.tower_cluster_id;
      this.propList.param.principle_id = this.getDataUser().principle_id;
      this.propList.param.type = this.type;
      this.propList.param.payment_method_id = this.payment_method;

      this.$nextTick(() => {
        this.$refs.ref_list.doGetList("");
      })
    },
    openFloorPlan() {
      let param = this.paramFromList;
      param.tower_cluster_id = this.Model.data.tower_cluster_id;
      this.$store.commit("setParamPage", param);
      this.$router.push({ name: "MK_FloorPlan" });
    },
    openLayout() {
      window.open(this.urlHoonian + this.Model.data.layout_image);
    },
    open360VR() {
      window.open(this.Model.data.dimension_360_link);
    },
    openBrochure() {
      window.open(this.getBrochureLink());
    },
    doWhatsapp() {
      let msg = this.replaceAllString(this.getBodyMessage(), "\n", "%0D%0A", "string");
      msg = this.replaceAllString(msg, "&nbsp;", "%20", "string");
      let url = "https://api.whatsapp.com/send?text=" + msg;
      window.open(url);
    },
    doEmail() {
      let attachmentUrl = encodeURIComponent(this.getBrochureLink().replace('\\', '/')) + "%0D%0A%0D%0A";
      let email = "";
      window.open(`mailto:${email}?subject=${this.Model.share.title}&body=${this.getBodyMessage()}`);
    },
    getBodyMessage() {
      return this.Model.share.body;
    },
    getBrochureLink() {
      return this.urlHoonian + this.Model.data.upload_brochure;
    },
    buyNUP() {

    },
    onImageLoadFailure(event) {
      event.target.src = require("@/assets/logo_hoonian1.svg");
    },
    getUnitTypeDetail() {
      let param = {
        unit_type_id: this.paramFromList.availableUnitTypes.id,
        principle_id: this.getDataUser().principle_id,
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/detail', param, true).then((response) => {
        if (response == null) return;
        this.Model = response.data;
        this.changeImage(this.Model.image.length > 0? this.Model.image[0].thumbnail_image: '');

        this.setPropList();
      });
    },
    changeType(type) {
      this.type = type;
      this.propList.param.type = this.type;
      this.$nextTick(() => {
        this.$refs.ref_list.doGetList("");
      })
    },
    /**
     * Copy of Excel's PMT function.
     * Credit: http://stackoverflow.com/questions/2094967/excel-pmt-function-in-js
     *
     * @param rate_per_period       The interest rate for the loan.
     * @param number_of_payments    The total number of payments for the loan in months.
     * @param present_value         The present value, or the total amount that a series of future payments is worth now;
     *                              Also known as the principal.
     * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.
     *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
     * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.
     *                              0 = At the end of period
     *                              1 = At the beginning of the period
     * @returns {number}
     */
    // Formula : https://superuser.com/questions/871404/what-would-be-the-the-mathematical-equivalent-of-this-excel-formula-pmt

    pmt (rate_per_period, number_of_payments, present_value, future_value, type) {
        future_value = typeof future_value !== 'undefined' ? future_value : 0;
        type = typeof type !== 'undefined' ? type : 0;

      // if (rate_per_period != 0.0) {
      //   // Interest rate exists
      //   var R = Math.pow(1 + rate_per_period, number_of_payments);
      //   return - (rate_per_period * (future_value + (R * present_value))) / ((1 + rate_per_period * (type)) * (R-1));

      // } else if (number_of_payments != 0.0) {
      //   // No interest rate, but number of payments exists
      //   return - (future_value + present_value) / number_of_payments;
      // }

      if(number_of_payments > 0){
        if (rate_per_period != 0){
          return ((future_value + present_value) * rate_per_period) / (1- Math.pow((1 + rate_per_period), (-1*number_of_payments)))
        }else{
          return (future_value + present_value / number_of_payments);
        }
      }else{
        
      }
      return present_value + future_value;
    },
    showBuyerDetails() {
      let param = {
        marketing_agent_id: this.getDataUser().marketing_id,
        unit_id: this.dataRowClick.id,
        lang_id: this.getDataUser().lang_id,
      };
      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/unit-detail', param).then((response) => {
        if (response == null) return;
        this.dataBuyerDetail = response.data;

        this.$nextTick(() => {
          this.$refs.Modal_BuyerDetails._show();
        });
      });
    },
    getOtherSuggestion() {
      let param = {
        unit_type_id: this.paramFromList.availableUnitTypes.id,
        principle_id: this.getDataUser().principle_id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/project/unit-type/suggestion", param, true).then((response) => {
        if (response == null) return;
        this.OtherSuggestion = response.data;
      });
    },
    doViewDetail: async function(data) {
      let param = this.paramFromList;
      param.availableUnitTypes.id = data.id;
      await this.$store.commit("setParamPage", param);
      
      this.getUnitTypeDetail();
      this.getOtherSuggestion();
    },
  },
  mounted() {
    this.PI_payment_method.dataLookUp.param.project_id = this.paramFromList.id;
    this.$refs.ref_payment_method.getData();
    this.getOtherSuggestion();
  },
  beforeDestroy: function() {
    clearInterval(this.intervalPleasePayIn);
  }
};
</script>

<style scoped>
</style>
