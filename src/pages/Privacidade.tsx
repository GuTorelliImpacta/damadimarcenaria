import { Seo } from '@/components/Seo'
import { SITE } from '@/data/site'

export function Component() {
  return (
    <>
      <Seo
        titulo="Privacidade | Marcenaria Damadi Junior"
        descricao="Como este site trata dados pessoais: sem cookies de rastreio, sem formulários e com contato direto pelo WhatsApp."
        path="/privacidade"
      />
      <section className="section">
        <div className="container-x max-w-3xl space-y-4 text-ink-800">
          <h1>Privacidade</h1>
          <p>
            Este texto explica, em linguagem simples, como tratamos dados neste site (Lei Geral de
            Proteção de Dados – LGPD).
          </p>
          <h2 className="!text-xl">O que coletamos</h2>
          <p>
            O site não tem formulários, login nem cookies de rastreio. Se usarmos estatísticas de
            visita, será com ferramenta anônima e sem cookies, que não identifica você.
          </p>
          <h2 className="!text-xl">WhatsApp e serviços de terceiros</h2>
          <p>
            Ao clicar em “Pedir orçamento”, você abre uma conversa no WhatsApp, serviço de terceiros
            com política própria. Os dados que você enviar (nome, fotos, medidas) são usados só para
            fazer o orçamento e atender seu pedido. O mapa do Google só carrega se você clicar em
            “Ver mapa aqui”.
          </p>
          <h2 className="!text-xl">Seus direitos</h2>
          <p>
            Você pode pedir acesso, correção ou exclusão dos dados que nos enviou, a qualquer
            momento, pelo WhatsApp {SITE.telefoneExibicao}.
          </p>
          <h2 className="!text-xl">Fotos e depoimentos</h2>
          <p>Só publicamos fotos e depoimentos de clientes com autorização.</p>
        </div>
      </section>
    </>
  )
}
