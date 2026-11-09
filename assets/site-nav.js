(function () {
  'use strict';

  function initSiteNav() {
    // 1. Ensure top horizontal nav is visible
    var topNav = document.getElementById('WDxLfe');
    if (topNav) {
      topNav.style.visibility = 'visible';
    }

    // 2. Desktop dropdowns (Developed tools, More)
    var topNavList = topNav ? topNav.querySelector('ul[jsname="waIgnc"]') : null;
    if (topNavList) {
      var topItems = Array.prototype.slice.call(topNavList.children);
      topItems.forEach(function (li) {
        var submenu = li.querySelector(':scope > div[jsname="QXE97"]');
        if (!submenu) return;
        var svg = li.querySelector(':scope > div > div svg.dvmRw');
        var toggleBtn = li.querySelector(':scope > div > div [jsname="ix0Hvc"]');
        var mainLink = li.querySelector(':scope > div > div > a');

        function openMenu() {
          submenu.style.display = 'block';
          if (svg) svg.classList.add('FWGjId');
          if (mainLink) mainLink.setAttribute('aria-expanded', 'true');
        }
        function closeMenu() {
          submenu.style.display = 'none';
          if (svg) svg.classList.remove('FWGjId');
          if (mainLink) mainLink.setAttribute('aria-expanded', 'false');
        }

        li.addEventListener('mouseenter', openMenu);
        li.addEventListener('mouseleave', closeMenu);

        if (toggleBtn) {
          toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (submenu.style.display === 'block') {
              closeMenu();
            } else {
              openMenu();
            }
          });
        }
        // If "More" link has no href, clicking it toggles the menu
        if (mainLink && !mainLink.getAttribute('href')) {
          mainLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (submenu.style.display === 'block') {
              closeMenu();
            } else {
              openMenu();
            }
          });
        }
      });

      // Handle nested submenus inside "More"
      var moreItem = topNavList.querySelector('li[more-menu-item]');
      if (moreItem) {
        var nestedExpanders = moreItem.querySelectorAll('[jsname="ix0Hvc"]');
        Array.prototype.forEach.call(nestedExpanders, function (btn) {
          var parentLi = btn.closest('li');
          if (!parentLi || parentLi === moreItem) return;
          var sub = parentLi.querySelector(':scope > div[jsname="QXE97"]');
          var svg = btn.querySelector('svg.dvmRw');
          if (sub) {
            btn.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
              var isOpen = sub.style.display === 'block';
              sub.style.display = isOpen ? 'none' : 'block';
              if (svg) svg.classList.toggle('FWGjId', !isOpen);
            });
          }
        });
      }

      // 3. Responsive "More" overflow calculation
      function updateMoreMenu() {
        if (!topNav || !moreItem || window.innerWidth < 768) return;
        var regularItems = topItems.filter(function (el) {
          return !el.hasAttribute('more-menu-item');
        });
        var inMoreItems = Array.prototype.slice.call(
          moreItem.querySelectorAll(':scope > div[jsname="QXE97"] > ul > li[in-more-item]')
        );

        // Reset all to visible
        regularItems.forEach(function (el) {
          el.classList.remove('ZmrVpf');
        });
        inMoreItems.forEach(function (el) {
          el.classList.add('ZmrVpf');
        });
        moreItem.classList.add('ZmrVpf');

        var headerContainer = topNav.parentElement;
        if (!headerContainer) return;
        var titleEl = headerContainer.querySelector('[jsname="I8J07e"]');
        var searchBtn = document.querySelector('[jsname="h04Zod"]');
        var titleWidth = titleEl ? titleEl.offsetWidth + 32 : 200;
        var searchWidth = searchBtn ? searchBtn.offsetWidth + 32 : 64;
        var available = headerContainer.clientWidth - titleWidth - searchWidth - 40;

        var used = 0;
        var overflowStart = -1;
        for (var i = 0; i < regularItems.length; i++) {
          used += regularItems[i].offsetWidth;
          if (used > available) {
            overflowStart = i;
            break;
          }
        }

        if (overflowStart >= 0) {
          moreItem.classList.remove('ZmrVpf');
          // Account for "More" button width (~85px)
          if (overflowStart > 0 && used - regularItems[overflowStart].offsetWidth + 85 > available) {
            overflowStart--;
          }
          for (var j = overflowStart; j < regularItems.length; j++) {
            regularItems[j].classList.add('ZmrVpf');
            if (inMoreItems[j]) {
              inMoreItems[j].classList.remove('ZmrVpf');
            }
          }
        }
      }

      updateMoreMenu();
      window.addEventListener('load', updateMoreMenu);
      window.addEventListener('resize', updateMoreMenu);
    }

    // 4. Mobile drawer (#yuynLe) & Hamburger button (#s9iPrd)
    var hamburgerBtn = document.getElementById('s9iPrd');
    var mobileDrawer = document.getElementById('yuynLe');
    var backdrop = document.querySelector('.TxnWlb[jsname="BDdyze"]');
    if (hamburgerBtn && mobileDrawer) {
      var hamSvg = hamburgerBtn.querySelector('svg.wFCWne');

      function toggleDrawer(forceOpen) {
        var isOpen = mobileDrawer.classList.contains('jsnVQ');
        var nextState = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;
        mobileDrawer.classList.toggle('jsnVQ', nextState);
        hamburgerBtn.setAttribute('aria-expanded', nextState ? 'true' : 'false');
        if (hamSvg) hamSvg.classList.toggle('o0iVae', nextState);
        if (backdrop) backdrop.classList.toggle('XPSexb', nextState);
      }

      hamburgerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDrawer();
      });

      if (backdrop) {
        backdrop.addEventListener('click', function () {
          toggleDrawer(false);
        });
      }

      // Expand/collapse submenus inside mobile drawer
      var drawerExpanders = mobileDrawer.querySelectorAll('[jsname="ix0Hvc"]');
      Array.prototype.forEach.call(drawerExpanders, function (btn) {
        var li = btn.closest('li');
        if (!li) return;
        var sub = li.querySelector(':scope > div[jsname="QXE97"]');
        var svg = btn.querySelector('svg.dvmRw');
        if (sub) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = sub.style.display === 'block';
            sub.style.display = isOpen ? 'none' : 'block';
            if (svg) svg.classList.toggle('FWGjId', !isOpen);
          });
        }
      });
    }

    // 5. Copy heading link buttons
    var copyBtns = document.querySelectorAll('[data-tooltip="Copy heading link"]');
    Array.prototype.forEach.call(copyBtns, function (btn) {
      btn.addEventListener('click', function (e) {
        var href = btn.getAttribute('href');
        if (href && navigator.clipboard) {
          var fullUrl = new URL(href, window.location.href).href;
          navigator.clipboard.writeText(fullUrl).catch(function () {});
        }
      });
    });

    // 6. Site-wide Search Bar
    var openSearchBtn = document.querySelector('[jsname="R9oOZd"]');
    var searchBanner = document.querySelector('.TbNlJb[jsname="MVsrn"]');
    var searchBackdrop = document.querySelector('.BuY5Fd[jsname="bF1uUb"]');
    var searchInput = document.querySelector('input[jsname="YPqjbf"]');
    var searchPlaceholder = document.querySelector('[jsname="LwH6nd"]');
    var clearSearchBtn = document.querySelector('[jsname="pZn8Oc"]');
    var backBtns = document.querySelectorAll('[jsname="GeGHKb"], [jsname="m1xNUe"]');

    var inSubdir =
      window.location.pathname.indexOf('/developed-tools/') !== -1 ||
      window.location.pathname.indexOf('/snacks/') !== -1;
    var prefix = inSubdir ? '../' : '';

    var searchIndex = [
      { title: 'Ewunate Assaye', url: prefix + 'index.html', keywords: 'Ewunate Assaye Home Education and experience MSc Bio-Instrumentation Engineering BSc Biomedical Engineering Jimma University University of Gondar Hiwot-Fana Specialized Hospital Certificates deep learning medical image health care data' },
      { title: 'Ewunate Assaye - About', url: prefix + 'about.html', keywords: 'Education and experience MSc Bio-Instrumentation Engineering BSc Biomedical Engineering Jimma University University of Gondar Hiwot-Fana Specialized Hospital Certificates deep learning medical image health care data' },
      { title: 'Ewunate Assaye - Awards', url: prefix + 'awards.html', keywords: 'Won MICCAI 2026 CARE Challenge Liver Segmentation CARE-Liver task Won MICCAI 2025 BraTS Challenge Tumor Progression' },
      { title: 'Ewunate Assaye - Developed tools', url: prefix + 'developed-tools.html', keywords: 'Developed tools MedImgAnnotator Medication Non-adherence classifier Acute respiratory infection predictor' },
      { title: 'Ewunate Assaye - MedImgAnnotator', url: prefix + 'developed-tools/medimgannotator.html', keywords: 'MedImgAnnotator batch-annotation preprocessing tool medical images volumes Python plugins MICCAI 2026 CARE Liver Challenge 6412 MR volumes' },
      { title: 'Ewunate Assaye - Medication Non-adherence', url: prefix + 'developed-tools/medication-non-adherence.html', keywords: 'Medication nonadherence monitoring real time classification data collection AI app diabetes' },
      { title: 'Ewunate Assaye - Acute respiratory Infection', url: prefix + 'developed-tools/acute-respiratory-infection.html', keywords: 'Automatic demographic information based acute respiratory infection predictor AI app aridetector streamlit' },
      { title: 'Ewunate Assaye - Publications', url: prefix + 'publications.html', keywords: 'Publications Kassaw Iterative human-in-the-loop learning liver Swin UNETR radiomics fertility rate Ethiopia type 2 diabetes khat chewing heart activity brain metastases EMG ECG muscle fatigue pharmacies MSc Thesis unsafe sexual behavior unintended pregnancy viral load suppression HIV acute respiratory infections' },
      { title: 'Ewunate Assaye - Research area', url: prefix + 'research-area.html', keywords: 'Research areas Medical image processing Health care data analysis Health care AI' },
      { title: 'Ewunate Assaye - Extracurricular activities', url: prefix + 'extracurricular-activities.html', keywords: 'Extracurricular activities Cycling India gate Leopard hills Running Strava Hiking Himachal Pradesh Simien Mountains Playing football IIT Delhi Playing basketball Jimma' },
      { title: 'Snacks - Best websites and links', url: prefix + 'snacks/best-websites-and-links.html', keywords: 'Snacks Fellowship and research opportunity sites Marie Sklodowska-Curie Actions AFRICAAI Conference sites ICLR NeurIPS MIDL CVPR ICCV ECCV MICCAI ISMRM ISBI Journal match Finders SpringerLink Wiley Elsevier IEEE Scimago MRI physics Radiology tutorials SPARK Academy' },
      { title: 'Snacks - Challenge websites', url: prefix + 'snacks/challenge-websites.html', keywords: 'Snacks Medical image segmentation and analysis challenge websites Grand challenges MICCAI MRIxFields Physionet Synapse Kaggle AMOS Codalab Datasets repositories Zenodo TCIA Hugging Face UCI Stanford AIMI MIDRC UK Biobank fastMRI Openneuro' },
      { title: 'Snacks - Interesting researchs', url: prefix + 'snacks/interesting-researchs.html', keywords: 'Snacks Interesting researchs CT segmentation model nnInteractive nnUnet nnFoundation NVIDIA Medical Imaging TotalSegmentator RadWorld MedVTok MedSynV2 medDARE SynthECG' }
    ];

    if (openSearchBtn && searchBanner) {
      var resultsBox = document.createElement('div');
      resultsBox.style.cssText = 'position:absolute;top:48px;left:0;right:0;max-width:680px;margin:0 auto;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.18);border-radius:0 0 8px 8px;max-height:360px;overflow-y:auto;z-index:9999;display:none;font-family:Roboto,Arial,sans-serif;';
      searchBanner.appendChild(resultsBox);

      function openSearch() {
        searchBanner.classList.add('upKXGe');
        searchBanner.style.zIndex = '200';
        if (searchBackdrop) {
          searchBackdrop.classList.add('upKXGe');
          searchBackdrop.style.zIndex = '190';
        }
        if (searchInput) {
          setTimeout(function () { searchInput.focus(); }, 50);
        }
      }

      function closeSearch() {
        searchBanner.classList.remove('upKXGe');
        if (searchBackdrop) searchBackdrop.classList.remove('upKXGe');
        resultsBox.style.display = 'none';
      }

      openSearchBtn.addEventListener('click', openSearch);
      if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);
      Array.prototype.forEach.call(backBtns, function (b) {
        b.addEventListener('click', closeSearch);
      });

      if (clearSearchBtn && searchInput) {
        clearSearchBtn.addEventListener('click', function () {
          searchInput.value = '';
          if (searchPlaceholder) searchPlaceholder.style.display = '';
          resultsBox.style.display = 'none';
          searchInput.focus();
        });
      }

      if (searchInput) {
        searchInput.addEventListener('input', function () {
          var q = searchInput.value.trim().toLowerCase();
          if (searchPlaceholder) {
            searchPlaceholder.style.display = q.length > 0 ? 'none' : '';
          }
          if (!q) {
            resultsBox.style.display = 'none';
            return;
          }
          var matches = searchIndex.filter(function (item) {
            return (
              item.title.toLowerCase().indexOf(q) !== -1 ||
              item.keywords.toLowerCase().indexOf(q) !== -1
            );
          });
          resultsBox.innerHTML = '';
          if (matches.length === 0) {
            resultsBox.innerHTML = '<div style="padding:14px 18px;color:#666;font-size:14px;">No matching pages found.</div>';
          } else {
            matches.forEach(function (m) {
              var a = document.createElement('a');
              a.href = m.url;
              a.style.cssText = 'display:block;padding:12px 18px;text-decoration:none;color:#1a73e8;border-bottom:1px solid #eee;font-size:14px;font-weight:500;';
              a.textContent = m.title;
              var sub = document.createElement('div');
              sub.style.cssText = 'color:#5f6368;font-size:12px;font-weight:400;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
              sub.textContent = m.keywords;
              a.appendChild(sub);
              resultsBox.appendChild(a);
            });
          }
          resultsBox.style.display = 'block';
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteNav);
  } else {
    initSiteNav();
  }
})();
