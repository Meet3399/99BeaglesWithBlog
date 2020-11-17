<script>
    import { goto } from '@sapper/app';
    import { token } from "./store";
    token.set(null)
    goto('/');
</script>
