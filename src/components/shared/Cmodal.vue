<template>
  <span :class="{'d-inline-block': tag}">
    <slot name="activator" :show="show" :hide="hide" :attrs="tagAttrs">
      <component :is="tag" v-bind="tagAttrs" @click.stop="show">
        {{ label }}
        <font-awesome-icon
            v-if="icon"
            :icon="icon"
            :class="[iconClass, {'align-middle ml-1': $dir.rtl, 'mr-1': $dir.ltr}]"
        />
      </component>
    </slot>

    <b-modal v-model="open" v-bind="$attrs" @hide="hide" hide-header-close>
      <slot :open="open" :show="show" :hide="hide"></slot>
      <template #modal-footer>
        <slot name="actions" :submit="submit" :hide="hide">
          <b-row class="flex-grow-1">
            <b-col cols="6">
              <b-btn variant="warning" block class="text-nowrap" :disabled="progressing" @click="submit">
                {{confirmLabel}}
                <font-awesome-icon v-if="progressing" spin icon="circle-notch" class="text-black align-middle mx-1"/>
              </b-btn>
            </b-col>

            <b-col cols="6">
              <b-btn variant="danger" block class="text-nowrap cancel-btn-cmodal" @click="hide">
                {{cancelLabel}}
              </b-btn>
            </b-col>
          </b-row>
        </slot>
      </template>
    </b-modal>
  </span>
</template>

<script>
    export default {
        name: 'CModal',
        props: {
            value: {type: Boolean, default: null},
            icon: {type: [Array, String]},
            iconClass: {type: [Object, String]},
            disabled: {type: Boolean, default: false},
            tag: {type: [String, Boolean], default: 'b-btn'},
            progressing: {type: Boolean, default: false},
            tagAttrs: {
                type: Object,
                default: () => ({})
            },
            label: {
                type: String,
                default: null
            },
            cancelLabel: {
              type: String,
              default: 'Never mind'
            },
            confirmLabel: {
              type: String,
              default: 'Accept'
            }
        },
        inheritAttrs: false,
        data() {
            return {
                open: false
            }
        },
        watch: {
            value(val) {
                this.open = val
              if (val) {
                this.$emit('show')
              }
            },
            open(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            show() {
                if (this.disabled) {
                    return
                }
                this.$emit('show')
                this.open = true
                this.$nextTick(() => {
                    this.$emit('shown')
                })
            },
            submit() {
                this.$emit('submit', {hide: this.hide, show: this.show})
            },
            hide() {
                this.$emit('hide')
                this.open = false
                this.$nextTick(() => {
                    this.$emit('hidden')
                })
            }
        }
    }
</script>
