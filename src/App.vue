<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="sideNav"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
            v-if="userIsAuthenticated"
            @click="onLogout">
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
        class="primary"
        app
        dark
    >
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          DevMeetups
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
            flat
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn
            flat
            v-if="userIsAuthenticated"
            @click="onLogout">
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <app-loading style="position: absolute; top: -14px"></app-loading>
      <div class="main-container">
        <router-view/>
      </div>
    </v-content>

    <v-footer fixed app>
      <span>&copy; {{(new Date()).getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sideNav: false
    };
  },

  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: 'mdi-face',
          title: 'Sign up',
          link: '/signup'
        },
        {
          icon: 'mdi-lock-open',
          title: 'Sign in',
          link: '/signin'
        }
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'mdi-account-supervisor',
            title: 'View Meetups',
            link: '/meetups'
          },
          {
            icon: 'mdi-map-marker',
            title: 'Organize Meetup',
            link: '/meetup/new'
          }
        ];
      }

      return menuItems;
    },

    userIsAuthenticated() {
      return !!this.$store.getters.user;
    }
  },

  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/signin');
    }
  }
};
</script>

<style scoped>
.main-container {
  overflow-y: auto;
  height: calc(100vh - 100px);
}
</style>


<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
