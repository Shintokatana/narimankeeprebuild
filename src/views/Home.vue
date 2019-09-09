<template>
    <div>
        <search/>
        <notes/>
        <logout/>
    </div>
</template>

<script>
// @ is an alias to /src
import logout from '@/components/global/logout'
import search from '@/components/global/searchNotes'
import notes from '@/components/notes/notes'

export default {
	name: 'home',
	components: {
        logout,
        notes,
        search
	}
}
</script>
