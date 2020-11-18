<script>
    import { goto } from '@sapper/app';
    import { token, userName } from "./store";
    token.set(null)
    userName.set(null)
    goto('/');
</script>
