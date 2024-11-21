<script setup>
import btnImg from 'assets/images/navbar/btn.png';
import nbtnImg from 'assets/images/navbar/nbtn.png';

import { useWindowSize } from '@vueuse/core';
// 检测屏幕宽度
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
</script>

<template>
  <Navbar
      background-color="body-tertiary"
      position="fixed-top"
      expand="lg"
  >
    <Container type="fluid" class="px-md-5 px-3">
      <NavbarBrand to="/">
        <img class="navbar-btn-img" src="../assets/images/navbar/logo.png" alt="">
      </NavbarBrand>
      <div v-show="isMobile" class="login-btn">
        <a href="/apply">
          <img :src="nbtnImg" alt="">
        </a>
      </div>
      <NavbarToggler target="#offcanvasRight" />
      <Offcanvas
          id="offcanvasRight"
          placement="end"
      >
        <OffcanvasHeader>
<!--          <OffcanvasTitle>Offcanvas</OffcanvasTitle>-->
          <CloseButton dismiss="offcanvas" />
        </OffcanvasHeader>
        <OffcanvasBody>
          <NavbarNavList class="mx-auto mb-2 mb-lg-0">
            <NavItem>
              <NavLink>
                關於我們
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>債務一筆清</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>樓宇按揭</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>私人貸款</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>常見問題</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/article/1">博客</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/apply"><img class="navbar-btn-img" :src="btnImg" alt=""></NavLink>
            </NavItem>
          </NavbarNavList>
        </OffcanvasBody>
      </Offcanvas>
    </Container>
  </Navbar>
</template>

<style scoped lang="scss">
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 15px; /* 控制菜单项之间的间隔 */
}
@include responsive('pc'){
  .nav-link {
    font-weight: bold;
    font-size: 22px;
  }
  .navbar-btn-img {
    height: 60px;
  }
}
@include responsive('mobile'){
  .login-btn {
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    img {
      height: 40px;
    }
  }
  .navbar-toggler {
    border: none;
  }
  .nav-link {
    font-weight: bold;
    font-size: 16px;
  }
  .navbar-btn-img {
    height: 40px;
  }
}




</style>