document.addEventListener("DOMContentLoaded", function () {
  // Get the text element
  const textElement = document.getElementById("text-resize");
  const initialFontSize = parseFloat(
    window.getComputedStyle(textElement).fontSize
  );

  $(document).ready(function () {
    const initialFontSizes = {};
    var i = 0;
    function setInitiateValue() {
      let data_element = 0;
      $("#text-resize *").each(function () {
        //   if (!$(this).parents(".dont_change_layout").length) {
        //    console.log(parseFloat(window.getComputedStyle(this).fontSize));

        initialFontSizes[data_element] = parseFloat(
          window.getComputedStyle(this).fontSize
        );
        data_element++;
        //   }
      });
    }

    $(document).on("click", "#increaseTextSize", function () {
      if (i == 0) {
        setInitiateValue();
      }
      i++;
      adjustFontSize(1); // Increase font size by 2px
    });
    $(document).on("click", "#decreaseTextSize", function () {
      if (i == 0) {
        setInitiateValue();
      }
      i++;
      adjustFontSize(-1); // Decrease font size by 2px
    });

    $(document).on("click", "#resetTextSize", function () {
      if (i == 0) {
        setInitiateValue();
      }
      console.log(initialFontSizes);
      i++;
      resetFontSize();
    });

    function adjustFontSize(change) {
      // Loop through all elements inside #text-resize and adjust their font size
      $("#text-resize *").each(function () {
        if (!$(this).parents(".dont_change_layout").length) {
          let currentSize = parseFloat(window.getComputedStyle(this).fontSize);
          let newSize = currentSize + change;

          // Prevent text from getting too small
          if (newSize >= 6) {
            this.style.fontSize = newSize + "px";
          }
        }
      });
    }

    function resetFontSize() {
      // Loop through all elements inside #text-resize and reset their font sizes
      let data_element = 0;
      $("#text-resize *").each(function () {
        this.style.fontSize = initialFontSizes[data_element] + "px";
        data_element++;
      });
    }

    // Handle navbar scroll effect
    $(document).ready(function () {
      window.addEventListener("scroll", function () {
        //alert(navbar);
        try {
          const navbar = document.getElementById("navbar");
          if (navbar) {
            const navbarHeight = navbar.offsetHeight;

            if (window.scrollY > navbarHeight) {
              $("#navbar").addClass("navbar-scrolled");
              //  navbar.classList.add('navbar-scrolled');
            } else {
              $("#navbar").removeClass("navbar-scrolled");
              // navbar.classList.remove('navbar-scrolled');
            }
          }
        } catch (ex) {}
      });
    });

    // Handle search input expansion
    // const searchButton = document.getElementById('searchButton');
    // const searchInput = document.getElementById('searchInput');

    // if (searchButton && searchInput) {
    //     searchButton.addEventListener('click', function () {
    //         searchInput.classList.toggle('expanded');
    //         searchInput.focus();
    //     });

    //     searchInput.addEventListener('blur', function () {
    //         if (this.value === '') {
    //             this.classList.remove('expanded');
    //         }
    //     });
    // // }
    // $(document).ready(function () {
    //     searchButton.addEventListener('click', function () {
    //         searchInput.classList.toggle('expanded');
    //         searchInput.focus();
    //     });

    //     searchInput.addEventListener('blur', function () {
    //         if (this.value === '') {
    //             this.classList.remove('expanded');
    //         }
    //     });
    // })
  });
});
