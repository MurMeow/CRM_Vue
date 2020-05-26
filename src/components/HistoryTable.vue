<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'HomeBill_Amount' | localize}}</th>
      <th>{{'HomeBill_Date' | localize}}</th>
      <th>{{'HomeBill_Category' | localize}}</th>
      <th>{{'HomeBill_Type' | localize}}</th>
      <th>{{'HomeBill_Open' | localize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency('BYN') }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          :class="[record.typeClass]"
          class="white-text badge"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          v-tooltip= "'OpenRecord'"
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
