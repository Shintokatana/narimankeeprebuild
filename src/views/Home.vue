<template>
    <div>
        <notes/>
        <logout/>
    </div>
</template>

<script>
// @ is an alias to /src
import logout from '@/components/global/logout'
import notes from '@/components/notes/notes'

export default {
	name: 'home',
	components: {
        logout,
        notes
	}
}
</script>
