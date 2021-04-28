<template>
  <div class="dashboard-page-chart">
    <div class="dashboard-page-chart__body">
      <b-row class="dashboardBody">
        <b-col lg="12" xl="12" style="background: white;">
         <b-row>
           <b-col>
             {{paramFromList.projectName}}
           </b-col>
         </b-row>
         <b-row>
           <b-col style="color: #828282; font-size: 12px;">
             {{paramFromList.address}}
           </b-col>
         </b-row>
         <b-row style="margin-top: 10px; padding-top: 10px; background: #F8F8F8;">
           <b-col style="color: #828282;">
             {{Model.data.project_status}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.location_name}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.project_name}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.tower_cluster_name}}
             &nbsp;&nbsp; > &nbsp;&nbsp;
             {{Model.data.unit_type_name}}
           </b-col>
         </b-row>
         <b-row style="padding-top: 10px; background: #F8F8F8;">
           <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
             {{ $t('unit_details') }}
           </b-col>
           <b-col sm="3">
             <b-row style="text-align: right;">
               <b-col>
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
                <b-col>
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
                <b-col>
                  <b-img :src="require('@/assets/icon-svg/whatsapp_white.svg')" alt="" style="cursor: pointer;" @click="doWhatsapp"/>
                </b-col>
                <b-col>
                  <b-img :src="require('@/assets/icon-svg/email_white.svg')" alt="" style="cursor: pointer;" @click="doEmail"/>
                </b-col>
             </b-row>
           </b-col>
         </b-row>
         
         <b-row style="background: #F8F8F8; padding-top: 10px;">
           <b-col sm="4" style="padding: unset !important; padding-right: 5px !important;">
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('total_units') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.count}}
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('bedrooms') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.total_bedroom}} <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" />
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('bathrooms') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.total_bathroom}} <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" />
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('net_area') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.net_area}} m <sup>2</sup>
               </b-col>
             </b-row>
             <b-row class="row-view-black">
               <b-col>
                 {{ $t('gross_area') }}
               </b-col>
               <b-col sm="4">
                 {{Model.data.gross_area}} m <sup>2</sup>
               </b-col>
             </b-row>
             <b-row style="margin-top: 40px; color: white;">
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="openFloorPlan">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/floor_plan.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      {{ $t('floor_plan') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="openLayout">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/layout.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      {{ $t('layout') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
             <b-row style="margin-top: 5px; color: white;">
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="open360VR">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/vr.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      360<sup>o</sup> {{ $t('vr') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
               <b-col>
                 <div style="background: rgba(0, 0, 0, 0.2);">
                  <b-row style="cursor: pointer;" @click="openBrochure">
                    <b-col sm="2" align-self="center">
                      <b-img :src="require('@/assets/icon-svg/e_brochure.svg')" alt="" style=""/>
                    </b-col>
                    <b-col style="padding: 5px !important; text-align: center;">
                      {{ $t('e_brochure') }}
                    </b-col>
                  </b-row>
                 </div>
               </b-col>
             </b-row>
           </b-col>
           <b-col sm="5" style="">
             <b-img :src="urlHoonian + Model.data.layout_image" alt=""
                :style="`height: 310px;`"
                fluid-grow @error="onImageLoadFailure($event)" />
           </b-col>
           <b-col sm="3" style="padding: unset !important;">
            <div v-for="(image, index) in Model.image" :key="index">
              <b-row v-if="index % 2 == 0" style="margin-top: 10px !important; margin-left: 5px !important; margin-right: 5px !important;">
                <b-col>
                  <b-img :src="urlHoonian + Model.image[index].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="changeImage(Model.image[index].thumbnail_image)" />
                </b-col>
                <b-col v-if="Model.image.length > (index + 1)">
                  <b-img :src="urlHoonian + Model.image[index + 1].thumbnail_image" alt=""
                    :style="`width: 90px; height: 90px; cursor: pointer;`"
                    fluid-grow @error="onImageLoadFailure($event)" @click="changeImage(Model.image[index + 1].thumbnail_image)" />
                </b-col>
              </b-row>
            </div>
           </b-col>
         </b-row>

         <b-row style="background: white; padding-top: 20px; margin-top: 10px;">
           <b-col style="padding: unset !important;">
             <b-row>
               <b-col sm="4">
                 <span style="cursor: pointer; padding-bottom: 5px;" :style="type == 'all' ? 'color: #4A93B3; border-bottom: 2px solid;': 'color: #b5b5b5;'" @click="changeType('all')">
                   ALL
                 </span>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span style="cursor: pointer; padding-bottom: 5px;" :style="type == 'available' ? 'color: #219653; border-bottom: 2px solid;': 'color: #b5b5b5;'" @click="changeType('available')">
                   AVAILABLE
                 </span>
               </b-col>
               <b-col style="text-align: right;">
                 <span style="margin-right: 20px; cursor: pointer;" @click="changeType('buyer')">
                   <span style="width: 17px; height: 17px; background: #56CCF2;">
                   &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  &nbsp;&nbsp;
                  YOUR BUYER
                 </span>
                 <span style="text-shadow: 0.5px 0px; margin-right: 20px;">
                   Booking Fee
                 </span>
                 <span style="color: #2F80ED">
                   {{ isCurrency(Model.data.booking_fee, 0) }}
                 </span>
               </b-col>
             </b-row>
             <b-row style="margin-top: 10px;">
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
                  >
                    <template slot="unit_no" slot-scope="data">
                      <span style="color: #4A93B3">
                        {{data.item.unit_no}}
                      </span>
                    </template>
                    <template slot="head_total_bedroom" slot-scope="data">
                      <b-img :src="require('@/assets/icon-svg/bedroom.svg')" alt="" style=""/>
                    </template>
                    <template slot="head_total_bathroom" slot-scope="data">
                      <b-img :src="require('@/assets/icon-svg/bathroom.svg')" alt="" style=""/>
                    </template>
                    <template slot="price" slot-scope="data">
                      <b-row>
                        <b-col align-self="center">
                          {{ isCurrency(data.item.price, 0) }}
                        </b-col>
                        <b-col sm="2">
                          <b-img :src="require('@/assets/icon-svg/calculator.svg')" alt="" style="" @click.stop="showCalculator(data.item)" />
                        </b-col>
                        <b-col sm="1">
                          &nbsp;
                        </b-col>
                      </b-row>
                    </template>
                    <template slot="status" slot-scope="data">
                      <b-row>
                        <b-col align-self="center" :sm="data.item.status == 'available' || data.item.status == 'booked' ? 4: 12"
                          style="padding-left: unset !important;">
                          <span :style="data.item.status == 'available'? 'color: #219653;':
                                      (data.item.status == 'sold'? 'color: #EB5757;': 'color: #F2C94C;')">
                            {{data.item.status.toUpperCase()}}
                          </span>
                        </b-col>
                        <b-col v-if="data.item.status == 'available' || data.item.status == 'booked'">
                          <ABSButton
                            :text="data.item.status == 'available'? 'Reservation' :
                                  (data.item.status == 'booked'? 'Waiting List': '')"

                            :classButton="data.item.status == 'available'? 'btn btn--default' :
                                        (data.item.status == 'booked'? 'btn btn--yellow': '')"
                            classIcon="icon-style-1"
                            @click="doReservationOrBooked(data.item)"
                            styleButton="height: 30px; width: 100%;"
                          />
                        </b-col>
                      </b-row>
                    </template>
                  </HOOList>
                  <ABSModal id="Modal_Calculator" ref="Modal_Calculator" size="lg">
                    <template slot="headerTitle">
                      <span class="title-primary"> {{ $t('loan_calculator') }} </span>
                    </template>
                    <template slot="content">
                      <b-row v-if="dataRowClick">
                        <b-col md="12" style="padding-left: unset !important; padding-right: unset !important;">
                          <b-form :data-vv-scope="'FormEntry'" :data-vv-value-path="'FormEntry'">
                            <b-row style="text-shadow: 0.5px 0px; font-size: 18px;">
                              <b-col md="6">
                                {{ $t('unit_no') }}
                                <br />
                                <span style="color: #4A93B3">
                                  {{dataRowClick.unit_no}}
                                </span>
                              </b-col>
                              <b-col md="6">
                                {{ $t('unit_price') }}
                                <br />
                                <span style="color: #4A93B3">
                                  IDR {{ isCurrency(dataRowClick.price, 0) }}
                                </span>
                              </b-col>
                            </b-row>
                            <b-row style="margin-top: 20px;">
                              <b-col md="6">
                                <span>
                                  <label class="lbl-poppins">{{ $t('loan_percentage') }} (%)</label>
                                </span>
                                <ACCTextBox
                                  :prop="PI_loan_percentage"
                                  v-model="Calculate.loan_percentage"
                                  ref="ref_loan_percentage"
                                />
                              </b-col>
                              <b-col md="6">
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
                              <b-col md="6">
                                <span>
                                  <label class="lbl-poppins">{{ $t('loan_amount') }}</label>
                                </span>
                                <ACCTextBox
                                  :prop="PI_loan_amount"
                                  v-model="Calculate.loan_amount"
                                  ref="ref_loan_amount"
                                />
                              </b-col>
                              <b-col md="6">
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
                                  {{ isCurrency(monthlyInstallment, 2) }}
                                </span>
                              </b-col>
                            </b-row>
                          </b-form>
                        </b-col>
                      </b-row>
                    </template>
                  </ABSModal>
                  <ABSModal id="Modal_Reservation" ref="Modal_Reservation" size="md">
                    <template slot="headerTitle">
                      <span v-if="dataRowClick" class="title-primary"> {{ $t('buyer_details') }} - {{ dataRowClick.status == 'available'? 'Reservation': 'Waiting List' }} </span>
                    </template>
                    <template slot="content">
                      <b-row v-if="dataRowClick">
                        <b-col md="12" style="padding-left: unset !important; padding-right: unset !important;">
                          <b-form :data-vv-scope="'FormEntryBuyer'" :data-vv-value-path="'FormEntryBuyer'">
                            <b-row class="row-view">
                              <b-col class="lbl-poppins" style="padding-left: 10px !important;">
                                {{ $t('unit_no') }}
                                <span style="color: #4A93B3">
                                  {{dataRowClick.block_floor_name}} -
                                  {{dataRowClick.unit_no}}
                                </span>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col md="8">
                                <b-row>
                                  <b-col>
                                    <span>
                                      <label class="lbl-poppins">{{ $t('handphone_no') }}</label>
                                    </span>
                                    <ACCTextBox
                                      :prop="PI_handphone_no"
                                      v-model="BuyerDetails.handphone_no"
                                      ref="ref_handphone_no"
                                    />
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col>
                                    <span>
                                      <label class="lbl-poppins">{{ $t('buyer_name') }}</label>
                                    </span>
                                    <ACCTextBox
                                      :prop="PI_buyer_name"
                                      v-model="BuyerDetails.buyer_name"
                                      ref="ref_buyer_name"
                                    />
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col>
                                    <span>
                                      <label class="lbl-poppins">{{ $t('id_no') }}</label>
                                    </span>
                                    <ACCTextBox
                                      :prop="PI_id_no"
                                      v-model="BuyerDetails.id_no"
                                      ref="ref_buyer_id_no"
                                    />
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col>
                                    <span>
                                      <label class="lbl-poppins">{{ $t('email') }}</label>
                                    </span>
                                    <ACCTextBox
                                      :prop="PI_email"
                                      v-model="BuyerDetails.email"
                                      ref="ref_buyer_email"
                                    />
                                  </b-col>
                                </b-row>
                                
                              </b-col>
                              <b-col offset-md="1" md="3">
                                 <span>
                                  <label class="lbl-poppins">{{ $t('id_picture') }}</label>
                                </span>
                                <br />
                                <b-img id="name_card_show" fluid :src="urlHoonian + BuyerDetails.id_picture" alt="" height="150" @error="onImageLoadFailure($event)" />
                                <HOOImageUpload
                                  :prop="PI_id_picture"
                                  @change="OnIdPictureChange"
                                  v-model="BuyerDetails.id_picture"
                                />
                              </b-col>
                            </b-row>
                            <b-row style="margin-top: 20px;">
                              <b-col offset-sm="4" sm="4">
                                <ABSButton
                                  :text="$t('confirmation')"
                                  classButton="btn btn--default"
                                  classIcon="icon-style-1"
                                  @click="doConfirmation"
                                  styleButton="height: 40px; width: 100%;"
                                />
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
                        <b-col sm="4" style="padding-left: unset !important;">
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('id_no') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.id_no}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('buyer_name') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.name}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
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
                        <b-col sm="4" style="padding-left: unset !important;">
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('project_name') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.project_name}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('unit_no') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.unit_no}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('unit_type') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{dataBuyerDetail.info.unit_type_name}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('date') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{momentUnix(dataBuyerDetail.info.purchase_date, "DD MMM YYYY")}}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('price') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ isCurrency(dataBuyerDetail.info.price, 0) }}
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('booking_fee') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ isCurrency(dataBuyerDetail.info.booking_fee, 0) }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('tower') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ dataBuyerDetail.info.tower_cluster_name }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('floor') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ dataBuyerDetail.info.block_floor_name }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('status') }}</label>
                            </b-col>
                            <b-col :style="dataBuyerDetail.info.status == 'available'? 'color: #219653;':
                                    (dataBuyerDetail.info.status == 'sold'? 'color: #EB5757;': 'color: #F2C94C;')">
                              {{ dataBuyerDetail.info.status? dataBuyerDetail.info.status.toUpperCase(): "" }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              <label class="lbl-poppins">{{ $t('commission') }}</label>
                            </b-col>
                            <b-col style="color: #4A93B3;">
                              {{ isCurrency(dataBuyerDetail.info.marketing_commission, 0) }}
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
               <b-col style="text-shadow: 0.5px 0px; font-size: 22px;">
                 {{ $t('other_suggestion') }}
               </b-col>
             </b-row>
             <b-row style="background: #F8F8F8;">
               <b-col style="padding-left: 50px; padding-right: 50px;">
                <vue-horizontal-list
                  :items="OtherSuggestion"
                  :options="options"
                >
                  <template v-slot:nav-prev>
                    <!-- <div>
                      <b-img :src="require('@/assets/icon-svg/chevron_left.svg')" alt="" style="cursor: pointer; margin-top: 8px; margin-left: unset !important;" />
                    </div> -->
                  </template>

                  <template v-slot:nav-next>
                    <!-- <div>
                      <b-img :src="require('@/assets/icon-svg/chevron_right.svg')" alt="" style="cursor: pointer; margin-top: 8px; margin-right: unset !important;" />
                    </div> -->
                  </template>

                  <template v-slot:start>
                    <!-- <div>First Item</div> -->
                  </template>

                  <template v-slot:end>
                    <!-- <div>Last Item</div> -->
                  </template>
                  <template v-slot:default="{item}">
                    <div class="card">
                      <div class="card__body" style="padding: unset !important;">
                        <b-row>
                          <b-col style="padding: unset !important;">
                            <b-img :src="urlHoonian + item.thumbnail_image" alt=""
                            :style="`height: 275px; cursor: pointer; position: relative;`"
                            fluid-grow @error="onImageLoadFailure($event)" @click="doViewDetail(item)" />
                          </b-col>
                        </b-row>
                        <b-row style="margin-top: 10px; padding: 0px 10px;">
                          <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                            {{item.tower_cluster_name}} - {{item.unit_type}}
                          </b-col>
                          <b-col style="font-size: 14px; text-align: right;">
                            <b-img :src="require('@/assets/icon-svg/map-pin.svg')" alt="" style="" />
                            {{item.location_name}}
                          </b-col>
                        </b-row>
                        <b-row style="margin-top: 5px !important; padding: 0px 10px;">
                          <b-col style="font-size: 14px; text-shadow: 0.5px 0px;">
                            {{ $t('start_from') }} {{ isCurrency(item.start_from_price, 0) }}
                          </b-col>
                        </b-row>
                        <b-row style="padding: 0px 10px;">
                          <b-col style="font-size: 12px;">
                            {{ isCurrency(item.price_per_meter_square,0) }} / m<sup>2</sup>
                          </b-col>
                        </b-row>
                        <b-row style="font-size: 12px; padding: 20px 10px; margin-top: 10px;">
                          <b-col>
                            <b-img :src="require('@/assets/icon-svg/house.svg')" alt="" style="" />
                            {{item.total}} {{ $t('units') }}
                          </b-col>
                          <b-col offset="2" sm="2" style="text-align: right;">
                            | &nbsp;
                            <b-img :src="require('@/assets/icon-svg/bed.svg')" alt="" style="" />
                            {{item.total_bedroom}}
                          </b-col>
                          <b-col style="text-align: right;">
                            | &nbsp;
                            <b-img :src="require('@/assets/icon-svg/resize.svg')" alt="" style="" />
                            {{item.net_area}} m <sup>2</sup>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </template>
                </vue-horizontal-list>
              </b-col>
             </b-row>
           </b-col>
         </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
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
      BuyerDetails: {
        handphone_no: '',
        buyer_name: '',
        id_no: '',
        email: '',
        id_picture: '',
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
        }
      },
      unitListHeader: [
        {
          key: "unit_no",
          label: "UNIT",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
        },
        {
          key: "block_floor_name",
          label: "FLOOR",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "net_area",
          label: "NET AREA",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "gross_area",
          label: "SEMI-GROSS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "total_bedroom",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
        {
          key: "total_bathroom",
          label: "",
          tdClass: "ContentACCList2 notranslate th-cus-center poppins",
          thClass: "HeaderACCList2 th-cus-center poppins",
          isCustom: true,
        },
        {
          key: "direction",
          label: "DIRECTION",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "price",
          label: "PRICE",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
        },
        {
          key: "status",
          label: "STATUS",
          tdClass: "ContentACCList2 notranslate th-cus-left poppins",
          thClass: "HeaderACCList2 th-cus-left poppins",
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
        cDecimal: 2,
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
        cDecimal: 2,
        cInputStatus: "new"
      },
      // FormEntryBuyer
      PI_handphone_no: {
        cValidate: "required",
        cName: "Handphone No",
        cOrder: 1,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_buyer_name: {
        cValidate: "required",
        cName: "Buyer Name",
        cOrder: 2,
        cKey: false,
        cType: "text",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_no: {
        cValidate: "required",
        cName: "ID No",
        cOrder: 3,
        cKey: false,
        cType: "tel",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_email: {
        cValidate: "email|required",
        cName: "Email",
        cOrder: 4,
        cKey: false,
        cType: "email",
        cProtect: false,
        cParentForm: "FormEntryBuyer",
        cDecimal: 2,
        cInputStatus: "new"
      },
      PI_id_picture: {
        cValidate: "required",
        cName: "ID Picture",
        cOrder: 5,
        cTitle: "Upload Photo",
        cType: "unit",
        cParentForm: "FormEntryBuyer"
      },
      showMonthlyInstallment: false,
      monthlyInstallment: 0,
      pleasePayIn: "",
      intervalPleasePayIn: undefined,
      OtherSuggestion: [],
      options: {
        // item: {
        //   // css class to inject into each individual item
        //   class: "",
        //   // padding between each item
        //   padding: 12,
        // },
        // list: {
        //   // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
        //   // windowed: 1200,

        //   // Because: #app {padding: 80px 24px;}
        //   padding: 24,
        // },
        responsive: [
          // { end: 576, size: 1 },
          // { start: 576, end: 768, size: 2 },
          // { start: 768, end: 992, size: 3 },
          // { size: 4 },
          { end: 576, size: 2 },
          // { start: 576, end: 768, size: 3 },
          { start: 576, end: 1500, size: 3 },
          // { start: 992, end: 1200, size: 4 },
          { start: 1500, size: 4 },
        ],
        position: {
          start: -1,
        },
        navigation: {
          // when to show navigation
          start: 5000,
        },
        // autoplay: { play: true, repeat: true, speed: 3000 },
      },
    }
  },
  methods: {
    changeImage(path) {
      this.Model.data.layout_image = path;
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
        this.alertConfirmation("Are You Sure Want To Calculate This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntry");
              this.calculate();
            }
          }
        );
      });
    },
    calculate() {
      // let loanAmount = this.dataRowClick.price * +this.replaceAllString(this.Calculate.loan_percentage, ',', '', 'number');
      let loanAmount = this.replaceAllString(this.Calculate.loan_amount, ',', '', 'number');
      let pmt = this.pmt(
        this.replaceAllString(this.Calculate.interest, ',', '', 'number') / 12,
        this.replaceAllString(this.Calculate.tenor, ',', '', 'number'),
        loanAmount,
        0
      )
      this.monthlyInstallment = pmt;
      this.showMonthlyInstallment = true;
    },
    OnIdPictureChange(data) {
      this.BuyerDetails.id_picture = data.url;
    },
    doConfirmation() {
      this.$validator._base.validateAll("FormEntryBuyer").then((result) => {
        if (!result) return;
        this.alertConfirmation("Are You Sure Want To Save This Data ?").then(
          (ress) => {
            if (ress.value) {
              this.$validator.errors.clear("FormEntryBuyer");
              this.confirmation();
            }
          }
        );
      });
    },
    confirmation() {
      let param = {
          handphone: this.BuyerDetails.handphone_no,
          customer_name: this.BuyerDetails.buyer_name,
          email: this.BuyerDetails.email,
          id_no: this.BuyerDetails.id_no,
          thumbnail_image: this.BuyerDetails.id_picture,
          unit_id: this.dataRowClick.id,
          marketing_id: this.getDataUser().marketing_id,
          principle_id: this.getDataUser().principle_id,
          project_id: this.paramFromList.id
      };
      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/reserve-unit', param).then((response) => {
        if (response == null) return;
        this.showVA(response.data.transaction_id);
      });
    },
    showVA(id) {
      let param = {
        customer_transaction_id: id,
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/project/unit-type/virtual-account-list",
        param
      ).then((response) => {
        if (response == null) return;
        this.virtualAccount = response.data;
        this.$refs.Modal_Payment._show();
        if (this.intervalPleasePayIn) {
          clearInterval(this.intervalPleasePayIn);
        }
        this.timerPleasePayIn();
      });
    },
    closePayment() {
      this.$refs.Modal_Reservation._hide();
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
    doReservationOrBooked(data) {
      this.dataRowClick = data;
      this.BuyerDetails = {
        handphone_no: '',
        buyer_name: '',
        id_no: '',
        email: '',
        id_picture: '',
      },
      this.$refs.Modal_Reservation._show();
    },
    doWaitingList() {

    },
    rowClicked(data) {
      this.dataRowClick = data;
      this.showBuyerDetails();
    },
    setPropList() {
      this.propList.initialWhere = this.paramFromList.id;
      this.propList.param.unit_type_id = this.paramFromList.availableUnitTypes.id;
      this.propList.param.marketing_agent_id = this.getDataUser().marketing_id;
      this.propList.param.tower_cluster_id = this.Model.data.tower_cluster_id;
      this.propList.param.type = this.type;

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
      };

      this.postJSON(this.urlHoonian + '/api/marketing-website/project/unit-type/detail', param).then((response) => {
        if (response == null) return;
        this.Model = response.data;

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
    pmt (rate_per_period, number_of_payments, present_value, future_value, type) {
        future_value = typeof future_value !== 'undefined' ? future_value : 0;
        type = typeof type !== 'undefined' ? type : 0;

      if (rate_per_period != 0.0) {
        // Interest rate exists
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return - (rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

      } else if (number_of_payments != 0.0) {
        // No interest rate, but number of payments exists
        return - (future_value + present_value) / number_of_payments;
      }

      return 0;
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
      };
      this.postJSON(
        this.urlHoonian + "/api/marketing-website/project/unit-type/suggestion",
        param
      ).then((response) => {
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
    this.getUnitTypeDetail();
    this.getOtherSuggestion();
  },
  beforeDestroy: function() {
    clearInterval(this.intervalPleasePayIn);
  }
};
</script>

<style scoped>
</style>
