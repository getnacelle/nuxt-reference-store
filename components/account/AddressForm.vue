<template>
  <form
    :id="`address_form_${id}`"
    :action="`/account/addresses/${id}`"
    method="post"
    name="address"
    accept-charset="UTF-8"
  >
    <input type="hidden" name="form-name" value="address" />
    <input type="hidden" name="form_type" value="customer_address" /><input
      type="hidden"
      name="utf8"
      value="✓"
    />
    <div class="fields">
      <div class="field">
        <label :for="`AddressFirstName_${id}`">First Name</label>
        <input
          :id="`AddressFirstName_${id}`"
          v-model="newAddress.firstName"
          type="text"
          name="address[first_name]"
          placeholder="First Name"
          autocomplete="given-name"
        />
      </div>

      <div class="field">
        <label :for="`AddressLastName_${id}`">Last Name</label>
        <input
          :id="`AddressLastName_${id}`"
          v-model="newAddress.lastName"
          type="text"
          name="address[last_name]"
          placeholder="Last Name"
          autocomplete="family-name"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field one-whole" :class="{ error: hasError && !country }">
        <label :for="`AddressCountry_${id}`">Country*</label>
        <select
          :id="`AddressCountry_${id}`"
          v-model="newAddress.country"
          name="address[province]"
          autocomplete="address-level"
          required
        >
          <option
            v-for="country in countries"
            :key="country.name"
            :value="country.name"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="fields">
      <div class="field one-whole">
        <label :for="`AddressCompany_${id}`">Company (Optional)</label>
        <input
          :id="`AddressCompany_${id}`"
          v-model="newAddress.company"
          type="text"
          name="address[company]"
          autocomplete="organization"
          placeholder="Company"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field" :class="{ error: hasError && !address1 }">
        <label :for="`AddressAddress1_${id}`">Address*</label>
        <input
          :id="`AddressAddress1_${id}`"
          v-model="newAddress.address1"
          :class="{ 'input-error': hasError && !address1 }"
          type="text"
          name="address[address1]"
          autocomplete="street-address address-line1"
          placeholder="Address"
          required
          @focus="removeError"
        />
      </div>

      <div class="field">
        <label :for="`AddressAddress2_${id}`">Address (Optional)</label>
        <input
          :id="`AddressAddress2_${id}`"
          v-model="newAddress.address2"
          type="text"
          name="address[address2]"
          autocomplete="street-address address-line2"
          placeholder="Suite, Apt"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field city" :class="{ error: hasError && !city }">
        <label :for="`AddressCity_${id}`">City*</label>
        <input
          :id="`AddressCity_${id}`"
          v-model="newAddress.city"
          :class="{ 'input-error': hasError && !city }"
          type="text"
          name="address[city]"
          autocomplete="address-level2"
          placeholder="City"
          required
          @focus="removeError"
        />
      </div>
      <div class="field state" :class="{ error: hasError && !province }">
        <div id="AddressProvinceContainer_3026220941371" style="">
          <label :for="`AddressProvince_${id}`">State*</label>
          <select
            :id="`AddressProvince_${id}`"
            v-model="newAddress.province"
            name="address[province]"
            autocomplete="address-level1"
          >
            <option
              v-for="province in provinces"
              :key="province"
              :value="province"
            >
              {{ province }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="fields">
      <div class="field">
        <label :for="`AddressZip_${id}`">Postal/Zip Code</label>
        <input
          :id="`AddressZip_${id}`"
          v-model="newAddress.zip"
          type="text"
          name="address[zip]"
          autocapitalize="characters"
          autocomplete="postal-code"
        />
      </div>

      <div class="field" :class="{ error: hasError && !phone }">
        <label :for="`AddressPhone_${id}`">Phone*</label>
        <input
          :id="`AddressPhone_${id}`"
          v-model="newAddress.phone"
          :class="{ 'input-error': hasError && !phone }"
          type="tel"
          pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
          name="address[phone]"
          autocomplete="phone"
          placeholder="Phone"
          required
          @focus="removeError"
        />
      </div>
    </div>

    <div class="fields tablet-col">
      <div v-if="defaultAddress" class="field push-right">
        <div class="align-items-center">
          <input
            :id="`address_default_address_${id}`"
            v-model="setToDefault"
            type="checkbox"
            name="address[default]"
            value="true"
          />
          <label :for="`address_default_address_${id}`"
            >Set as default address</label
          >
        </div>
      </div>
    </div>

    <div class="fields tablet-col">
      <div class="field push-right address-buttons">
        <div class="btns">
          <input
            :value="ctaLabel"
            type="submit"
            class="btn"
            @click.prevent="submitForm"
          />
        </div>
      </div>
    </div>

    <input type="hidden" name="_method" value="put" />
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          id: '',
          address1: '',
          address2: '',
          city: '',
          company: '',
          country: 'United States',
          firstName: '',
          lastName: '',
          phone: '',
          province: '',
          zip: ''
        }
      }
    },
    action: {
      type: String,
      default: 'update'
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasError: false,
      setToDefault: false,
      phoneNumber: '',
      newAddress: { ...this.address },
      id: this.address.id
    }
  },
  computed: {
    ...mapState('account', ['defaultAddress', 'countries', 'provinces']),

    ctaLabel() {
      return this.action === 'update' ? 'Edit Address' : 'Add New Address'
    },
    isDefault() {
      if (this.defaultAddress) {
        return this.address.id === this.defaultAddress.id
      }

      return false
    },
    countryObject() {
      if (this.countries) {
        return this.countries.find(
          (country) => country.name === this.newAddress.country
        )
      } else {
        return null
      }
    }
  },
  watch: {
    countryObject() {
      if (this.address.country && this.countryObject.shortName) {
        this.fetchProvince({ countryShortName: this.countryObject.shortName })
      }
    },
    defaultAddress() {
      if (this.defaultAddress) {
        this.setToDefault = this.address.id === this.defaultAddress.id
      }
    }
  },
  created() {
    this.fetchCountries()
  },
  mounted() {
    if (this.defaultAddress) {
      this.setToDefault = this.address.id === this.defaultAddress.id
    }
  },
  methods: {
    ...mapActions('account', [
      'fetchCustomer',
      'updateAddress',
      'createAddress',
      'updateDefaultAddress',
      'fetchCountries',
      'fetchProvince'
    ]),

    removeError() {
      this.hasError = false
    },
    toggleEdit() {
      this.$emit('update:is-editing', !this.isEditing)
    },
    async submitForm() {
      if (
        !this.newAddress.city ||
        !this.newAddress.address1 ||
        !this.newAddress.country ||
        !this.newAddress.phone ||
        !this.newAddress.province
      ) {
        this.hasError = true
        return
      }

      if (!this.isDefault && this.setToDefault && this.address) {
        await this.updateDefaultAddress({ address: this.address })
      }

      await this[`${this.action}Address`]({
        id: this.address.id,
        address: {
          address1: this.newAddress.address1,
          address2: this.newAddress.address2,
          city: this.newAddress.city,
          company: this.newAddress.company,
          country: this.newAddress.country,
          firstName: this.newAddress.firstName,
          lastName: this.newAddress.lastName,
          phone: this.newAddress.phone,
          province: this.newAddress.province,
          zip: this.newAddress.zip
        }
      })

      this.$emit('submitted')
      this.$router.push('/account')
    }
  }
}
</script>
