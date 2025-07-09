<script>
export default {
    extends: 'k-url-input',
    props: {
        provider: String,
        media: Object,
    },
    mounted() {
        this.loadEmbedScripts()
    },
    methods: {
    },
};
</script>
