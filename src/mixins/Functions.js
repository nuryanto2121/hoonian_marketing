// import './plugins/axios'
import axios from 'axios'

export default {
    data() {
        return {
            queryString: require('querystring'),

            // content type
            urlEncoded: 'application/x-www-form-urlencoded',
            json: 'application/json',
            formData: 'multipart/form-data',
            StatusDashboard: {
                NW: { key: "NW", label: "New", variant: "Magenta" },
                AS: { key: "AS", label: "Assign", variant: "Lime" },
                DP: { key: "DP", label: "Dispatch", variant: "Green" },
                AR: { key: "AR", label: "Arrived", variant: "Purple" },
                SL: { key: "SL", label: "Start Loading", variant: "Blue" },
                FL: { key: "FL", label: "Finish Loading", variant: "Orange" },
                GO: { key: "GO", label: "Get Out", variant: "Red" },
                AD: { key: "AD", label: "Arrive Destination", variant: "Gold" },
                SU: { key: "SU", label: "Start Unloading", variant: "LightGreen" },
                FU: { key: "FU", label: "Finish Unloading", variant: "Pink" },
                // GD: { key: "GD", label: "Get Out Destination", variant: "Red" },
                POD: { key: "POD", label: "POD", variant: "LightGreen2" },
            },
            Status: {
                NW: { key: "NW", label: "New", variant: "Magenta" },
                AS: { key: "AS", label: "Assign", variant: "Lime" },
                DP: { key: "DP", label: "Dispatch", variant: "Green" },
                AR: { key: "AR", label: "Arrived", variant: "Purple" },
                SL: { key: "SL", label: "Start Loading", variant: "Blue" },
                FL: { key: "FL", label: "Finish Loading", variant: "Orange" },
                GO: { key: "GO", label: "Get Out", variant: "Red" },
                AD: { key: "AD", label: "Arrive Destination", variant: "Gold" },
                SU: { key: "SU", label: "Start Unloading", variant: "LightGreen" },
                FU: { key: "FU", label: "Finish Unloading", variant: "Pink" },
                // GD: { key: "GD", label: "Get Out Destination", variant: "Red" },
                POD: { key: "POD", label: "POD", variant: "LightGreen2" },
                CO: { key: "CO", label: "Close Order", variant: "LightGreen3" },
                X: { key: "X", label: "Cancel", variant: "Red" },
            },
        }
    },
    mounted() {
    },
    methods: {
        GetButtonStatus(ss_portfolio_id, group_id, user_id, menu_url) {
            var param = {
                option_function_cd: "GetUserMenuButtonStatus",
                module_cd: "SS",
                ss_portfolio_id: ss_portfolio_id,
                group_id: group_id,
                user_id: user_id,
                menu_url: menu_url
            }

            return this.CallFunction(param).then(response => {
                if (response == null) return null
                var data = response.Data
                if (data.length < 1) {
                    this.$store.commit("setButtonStatus", null);
                }
                else {
                    var x = {};
                    for (let i = 0; i < data.length; i++) {
                        x[data[i].button_id] = data[i].button_status == null ? true : data[i].button_status;
                    }
                    
                    this.$store.commit("setButtonStatus", x);
                }
                return data;
            })
        },
        getUserInfo (userId) {
            let param = {
              option_function_cd: "GetUserInfo",
              module_cd: "SS",
              user_id: userId,
            };
      
            return this.CallFunction(param).then((response) => {
              // response from API
              if (response == null) return null;
      
              return response.Data[0];
            });
        },
        getUrlIframEasyGo (nopol) {
            let urlIframe = this.urlIframeEasyGo;
            urlIframe = urlIframe.replace("${token}", this.getDataUser().gps_map_token);
            urlIframe += nopol;
            return urlIframe;
        }
    }
}