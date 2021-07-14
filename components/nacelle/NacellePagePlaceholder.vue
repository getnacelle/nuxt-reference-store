<template>
  <div class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-4 is-offset-4">
          <img src="/nacelle-logo.svg" width="100%" />
        </div>
        <div class="column is-6 is-offset-3">
          <h1>Welcome to your Nacelle Storefront</h1>
          <p>It looks like you don't have any data flowing to this page yet.</p>
          <p>
            For help,
            <a
              href="https://docs.getnacelle.com/nuxt/fetching-data.html#data-flow-and-static-files"
              target="none"
              >visit the docs.</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 48pt;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 2rem;
}
h1,
p {
  text-align: center;
}
p {
  font-size: 16pt;
  margin-bottom: 1rem;
}
</style>
