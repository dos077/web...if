<template>
  <div class="home">
    <div class="row justify-center items-center" style="min-height: 100vh; min-width: 100vw;">
      <q-card flat bordered>
        <q-card-section>
          Web ...if
        </q-card-section>
        <q-card-section>
          <q-btn outline to="/90">
            King of 90's
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-btn outline to="/2000">
            Millenial Fruit
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-btn outline to="/royal">
            Royal
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
