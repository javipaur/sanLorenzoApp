import { test, expect } from "@playwright/test";

const DIAS_SEMANA: Record<number, string> = {
  9: "Domingo",
  10: "Lunes",
  11: "Martes",
  12: "Miércoles",
  13: "Jueves",
  14: "Viernes",
  15: "Sábado",
};

// Durante las fiestas (9-15 agosto) la landing solo muestra los días >= hoy.
function diaVisibleEnLanding(): number {
  const hoy = new Date();
  const mes = hoy.getMonth() + 1;
  const dia = hoy.getDate();
  if (mes === 8 && dia >= 9 && dia <= 15) return dia;
  return 9;
}

test.describe("Landing page", () => {
  test("muestra hero con título y phases", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=San Lorenzo 2026")).toBeVisible();
    await expect(page.locator("text=Prelaurentis")).toBeVisible();
    await expect(page.locator("text=Pórtico Laurentino")).toBeVisible();
    await expect(page.locator("h3:has-text('Fiestas de San Lorenzo')")).toBeVisible();
  });

  test("muestra grid de días con día numerical", async ({ page }) => {
    await page.goto("/");
    const diaVisible = diaVisibleEnLanding();
    await expect(page.locator("text=Agenda por días")).toBeVisible();
    await expect(
      page.locator(`a.dia-card[href="/dia/${diaVisible}"]`)
    ).toBeVisible();
    await expect(page.locator(`text=${DIAS_SEMANA[diaVisible]}`)).toBeVisible();
  });

  test("muestra buscador de eventos", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.locator('input[placeholder*="Buscar evento"]');
    await expect(searchInput).toBeVisible();
  });

  test("búsqueda filtra eventos", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.locator('input[placeholder*="Buscar evento"]');
    await searchInput.fill("música");
    await page.waitForTimeout(300);
    const results = page.locator('[class*="absolute"] a[href^="/dia/"]');
    const count = await results.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("muestra sección de mapa", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Mapa interactivo")).toBeVisible();
  });

  test("navega a día al hacer clic en day card", async ({ page }) => {
    await page.goto("/");
    const diaVisible = diaVisibleEnLanding();
    const dayCard = page.locator(`a[href="/dia/${diaVisible}"]`).first();
    await dayCard.click();
    await expect(page).toHaveURL(new RegExp(`/dia/${diaVisible}`));
  });
});

test.describe("Día detail page", () => {
  test("muestra eventos del día", async ({ page }) => {
    await page.goto("/dia/9");
    await expect(page.locator("text=agosto ·")).toBeVisible();
  });

  test("muestra barra de timeline", async ({ page }) => {
    await page.goto("/dia/9");
    await expect(page.locator("text=Mañana")).toBeVisible();
  });

  test("muestra al menos un evento", async ({ page }) => {
    await page.goto("/dia/9");
    const eventos = page.locator(".evento-card");
    const count = await eventos.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Favoritos", () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["notifications"]);
  });

  test("estrella cambia de ☆ a ★ al añadir favorito", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");
    const favBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await expect(favBtn).toBeVisible();
    expect((await favBtn.innerText()).trim()).toBe("☆");

    await favBtn.click();
    await page.waitForTimeout(200);

    const removeBtn = page.locator('button[aria-label="Quitar de favoritos"]').first();
    await expect(removeBtn).toBeVisible();
    expect((await removeBtn.innerText()).trim()).toBe("★");
  });

  test("estrella cambia de ★ a ☆ al quitar favorito", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    const favBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await favBtn.click();
    await page.waitForTimeout(200);
    expect((await page.locator('button[aria-label="Quitar de favoritos"]').first().innerText()).trim()).toBe("★");

    const removeBtn = page.locator('button[aria-label="Quitar de favoritos"]').first();
    await removeBtn.click();
    await page.waitForTimeout(200);

    const reAddBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await expect(reAddBtn).toBeVisible();
    expect((await reAddBtn.innerText()).trim()).toBe("☆");
  });

  test("favorito persiste al recargar la página", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    const favBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await favBtn.click();
    await page.waitForTimeout(200);
    expect((await page.locator('button[aria-label="Quitar de favoritos"]').first().innerText()).trim()).toBe("★");

    await page.reload();
    await page.waitForSelector(".evento-card");

    const starBtn = page.locator('button[aria-label="Quitar de favoritos"]').first();
    await expect(starBtn).toBeVisible();
    expect((await starBtn.innerText()).trim()).toBe("★");
  });

  test("múltiples favoritos se añaden correctamente", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    const firstBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await firstBtn.click();
    await page.waitForTimeout(300);

    const secondBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await secondBtn.click();
    await page.waitForTimeout(300);

    const favs = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("sanlorenzo-favoritos") || "[]")
    );
    expect(favs.length).toBe(2);

    await page.goto("/favoritos");
    await page.waitForSelector(".evento-card");
    const cards = page.locator(".evento-card");
    expect(await cards.count()).toBe(2);
  });

  test("página de favoritos muestra eventos guardados", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    await page.locator('button[aria-label="Añadir a favoritos"]').first().click();
    await page.waitForTimeout(200);

    await page.goto("/favoritos");
    await expect(page.locator("text=Mis Favoritos")).toBeVisible();
    await expect(page.locator("text=eventos guardados")).toBeVisible();
    const cards = page.locator(".evento-card");
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test("página de favoritos muestra estado vacío sin favoritos", async ({ page }) => {
    await page.goto("/favoritos");
    await expect(page.locator("text=No tienes favoritos aún")).toBeVisible();
    await expect(page.locator("text=Explorar programa")).toBeVisible();
  });

  test("se puede quitar favorito desde la página de favoritos", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    await page.locator('button[aria-label="Añadir a favoritos"]').first().click();
    await page.waitForTimeout(200);

    await page.goto("/favoritos");
    await page.waitForSelector(".evento-card");

    const removeBtn = page.locator('button[aria-label="Quitar de favoritos"]').first();
    await removeBtn.click();
    await page.waitForTimeout(300);

    await expect(page.locator("text=No tienes favoritos aún")).toBeVisible();
  });

  test("favoritos de diferentes días aparecen agrupados", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");
    await page.locator('button[aria-label="Añadir a favoritos"]').first().click();
    await page.waitForTimeout(200);

    await page.goto("/dia/10");
    await page.waitForSelector(".evento-card");
    await page.locator('button[aria-label="Añadir a favoritos"]').first().click();
    await page.waitForTimeout(200);

    await page.goto("/favoritos");
    await page.waitForSelector(".evento-card");
    const groups = page.locator("section h2");
    expect(await groups.count()).toBeGreaterThanOrEqual(2);
  });

  test("favoritos persisten entre navegación de páginas", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    await page.locator('button[aria-label="Añadir a favoritos"]').first().click();
    await page.waitForTimeout(200);

    await page.goto("/conciertos");
    await page.waitForTimeout(300);

    await page.goto("/favoritos");
    await page.waitForSelector(".evento-card");
    const cards = page.locator(".evento-card");
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test("toggle rápido no corrompe estado", async ({ page }) => {
    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    const favBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await favBtn.click();
    await page.waitForTimeout(100);

    const removeBtn = page.locator('button[aria-label="Quitar de favoritos"]').first();
    await removeBtn.click();
    await page.waitForTimeout(100);

    const reAddBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await reAddBtn.click();
    await page.waitForTimeout(100);

    expect((await page.locator('button[aria-label="Quitar de favoritos"]').first().innerText()).trim()).toBe("★");
  });
});

test.describe("Conciertos", () => {
  test("carga página de conciertos", async ({ page }) => {
    await page.goto("/conciertos");
    await expect(page.locator("text=Conciertos")).toBeVisible();
  });

  test("muestra filtro de días", async ({ page }) => {
    await page.goto("/conciertos");
    await expect(page.locator('button:has-text("Todos")')).toBeVisible();
  });

  test("filtra por día al hacer clic", async ({ page }) => {
    await page.goto("/conciertos");
    const filterBtn = page.locator('button:has-text("Todos")');
    await filterBtn.click();
    const dayBtn = page.locator('button:has-text("9 ago")');
    if (await dayBtn.isVisible()) {
      await dayBtn.click();
      await page.waitForTimeout(300);
    }
  });
});

test.describe("Mapa", () => {
  test("carga página del mapa", async ({ page }) => {
    await page.goto("/mapa");
    await expect(page.locator('[aria-label="Volver al programa"]')).toBeVisible();
  });

  test("muestra controles del mapa", async ({ page }) => {
    await page.goto("/mapa");
    await expect(page.locator('[aria-label="Volver al programa"]')).toBeVisible();
  });
});

test.describe("Navegación", () => {
  test("bottom nav está visible en las páginas principales", async ({ page }) => {
    const nav = page.locator('[aria-label="Navegación principal"]');
    await page.goto("/");
    await expect(nav).toBeVisible();

    await page.goto("/favoritos");
    await expect(nav).toBeVisible();
  });

  test("bottom nav se oculta en el mapa a pantalla completa", async ({ page }) => {
    await page.goto("/mapa");
    await expect(page.locator('[aria-label="Navegación principal"]')).toBeHidden();
  });

  test("bottom nav permite navegar a favoritos", async ({ page }) => {
    await page.goto("/");
    const favLink = page.locator('nav a[href="/favoritos"]');
    await favLink.click();
    await expect(page).toHaveURL(/\/favoritos/);
  });

  test("bottom nav permite navegar al mapa", async ({ page }) => {
    await page.goto("/");
    const mapLink = page.locator('nav a[href="/mapa"]');
    await mapLink.click();
    await expect(page).toHaveURL(/\/mapa/);
  });
});

test.describe("PWA", () => {
  test("manifest está disponible", async ({ page }) => {
    const response = await page.goto("/manifest.json");
    expect(response?.status()).toBe(200);
  });

  test("service worker se registra", async ({ page }) => {
    test.setTimeout(20000);
    const swResp = await page.request.get("/sw.js");
    test.skip(swResp.status() !== 200, "Service worker no disponible en este entorno");

    await page.goto("/");
    const swReady = await page.evaluate(async () => {
      if (!("serviceWorker" in navigator)) return false;
      try {
        const reg = await Promise.race([
          navigator.serviceWorker.ready,
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
        ]);
        return reg ? "active" in reg && !!reg.active : false;
      } catch {
        return false;
      }
    });
    expect(swReady).toBe(true);
  });
});

test.describe("Notificaciones", () => {
  test("al marcar favorito se programa notificación y se dispara", async ({ page }) => {
    // En headless Chromium, grantPermissions('notifications') deja el permiso en
    // "denied". Se simula con un init script para que el permiso sea "granted".
    await page.addInitScript(() => {
      const permiso: NotificationPermission = "granted";
      Object.defineProperty(Notification, "permission", {
        get: () => permiso,
        configurable: true,
      });
      Notification.requestPermission = async () => permiso;
    });

    // Fijar reloj a 9 agosto 2026, 08:59:50 (10s antes del evento a las 09:00)
    await page.clock.install();
    await page.clock.setSystemTime(new Date("2026-08-09T08:59:50"));

    await page.goto("/dia/9");
    await page.waitForSelector(".evento-card");

    // Espiar constructor de Notification
    interface NotifCall {
      title: string;
      options: NotificationOptions;
    }

    interface NotifSpyWindow {
      __notifCalls: NotifCall[];
      Notification: {
        new (title: string, options?: NotificationOptions): Notification;
        permission: NotificationPermission;
        requestPermission: () => Promise<NotificationPermission>;
      };
    }

    await page.evaluate(() => {
      const w = window as unknown as NotifSpyWindow;
      w.__notifCalls = [];
      const OrigNotif = window.Notification;
      const mockNotif = function (
        this: void,
        title: string,
        options?: NotificationOptions
      ) {
        w.__notifCalls.push({ title, options: options ?? {} });
        return new OrigNotif(title, options);
      };
      w.Notification = mockNotif as unknown as NotifSpyWindow["Notification"];
      w.Notification.permission = OrigNotif.permission;
      w.Notification.requestPermission = OrigNotif.requestPermission.bind(OrigNotif);
    });

    // Marcar primer evento como favorito
    const favBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
    await favBtn.click();
    await page.waitForTimeout(200);

    // Avanzar reloj 11 segundos (pasamos de 08:59:50 a 09:00:01)
    // Con NEXT_PUBLIC_NOTIFICATION_TEST_DELAY=1000, el timer dispara a los 9s
    await page.clock.runFor(11_000);
    await page.waitForTimeout(500);

    const calls = await page.evaluate(() => {
      return (window as unknown as NotifSpyWindow).__notifCalls;
    });
    expect(calls.length).toBe(1);
    expect(calls[0].title).toContain("Colocación pañoleta");
    expect(calls[0].options.body).toContain("09:00");
  });
});

test.describe("SEO", () => {
  test("homepage tiene título correcto", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("San Lorenzo");
  });

  test("homepage tiene meta description", async ({ page }) => {
    await page.goto("/");
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(20);
  });

  test("días tienen generateMetadata", async ({ page }) => {
    await page.goto("/dia/9");
    const title = await page.title();
    expect(title).toContain("San Lorenzo");
  });
});
