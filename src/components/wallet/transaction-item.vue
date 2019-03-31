<template>
  <div class="transaction-item">
    <div class="transction-details">
    <img :src="userImg" alt="User Image" />
    <!-- e.g Sent 15 Steem to SteemGigs -->
    <div>{{ type.primary }} {{ transaction.details.amount }} {{ type.secondary }} {{ relevantUser }}</div>
    </div>
    <div :class="type.class" class="indicator">
    {{ type.indicator }} {{ transaction.details.amount }}
    </div>
  </div>
</template>
<script>
export default {
    name: 'transaction-item',
    props: {
        transaction: Object,
        user: String
    },
    computed: {
        type () {
            if (this.user === this.transaction.details.from) {
                return {
                    primary: 'Sent',
                    secondary: 'to',
                    indicator: '-',
                    class: 'sent'
                }
            } else {
                return {
                    primary: 'Received',
                    secondary: 'from',
                    indicator: '+',
                    class: 'received'
                }
            }
        },
        relevantUser () {
            if (this.user === this.transaction.details.from) {
                return this.transaction.details.to
            } else {
                return this.transaction.details.from
            }
        },
        userImg () {
            return `https://steemitimages.com/u/${this.relevantUser}/avatar`
        }
    }
}
</script>

<style lang="scss">
.transaction-item {
    background: white;
    background: white;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .indicator {
        font-weight: 700;
        font-size: 15px;
        &.received {
            color: #30c360;
        }
        &.sent {
            color: #ff6d6d;
        }
    }
    .transction-details {
        display: flex;
        flex-direction: row;
        align-items: center;
    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    }
}
</style>
